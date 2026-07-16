const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const db = require('../models');
// const { User } = db;
const { User } = require('../models');

router.post('/register', async (req, res) => {
    try{
        const { email, password, name } = req.body;
        
        if (!email || !password || password.length < 8){
            return res.status(400).json({ error: 'Email and password (min 8 chars) required'});
        }

        const existing = await User.findOne({where: { email }});
        if (existing) return res.status(409).json({ error: 'Email already registered'});

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({email, password_hash, name, role: 'user'});

        //NEVER send password_hash back
        res.status(201).json({id: user.id, email: user.email, name: user.name});
    } catch(err){
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req,res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({where: { email }});

        const ok = user && (await bcrypt.compare(password, user.password_hash));
        if (!ok) return res.status(401).json({error: 'Invalid email or password'});

        const token = jwt.sign(
            {sub : user.id, role: user.role}, //payload
            process.env.JWT_SECRET, // secret key
            { expiresIn: '1d' } // expires in 1 day
        );

        // token is one long string — the complete JWT. This string has three parts: header.payload.signature

        res.json({ token });
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Login failed'});
    }
});

module.exports = router;