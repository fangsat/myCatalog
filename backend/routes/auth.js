const router = require('express').Router();
const bcrypt = require('bcrypt');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');

// const db = require('../models');
// const { User } = db;
const { User } = require('../models');

router.post('/register', asyncHandler(async (req, res) => {

    const { email, password, name } = req.body;
    
    if (!email || !password || password.length < 8){
        return res.status(400).json({ error: 'Email and password (min 8 chars) required'});
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await User.findOne({where: { email: normalizedEmail }});
    if (existing) return res.status(409).json({ error: 'Email already registered'});

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({email: normalizedEmail, password_hash, name, role: 'user'});

    //NEVER send password_hash back
    res.status(201).json({id: user.id, email: user.email, name: user.name});

}));

router.post('/login', asyncHandler(async (req,res) => {

    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({where: { email: normalizedEmail }});

    const ok = user && (await bcrypt.compare(password, user.password_hash));
    if (!ok) return res.status(401).json({error: 'Invalid email or password'});

    const token = jwt.sign(
        {sub : user.id, role: user.role}, //payload
        process.env.JWT_SECRET, // secret key
        { expiresIn: '1d' } // expires in 1 day
    );

    // token is one long string — the complete JWT. This string has three parts: header.payload.signature

    // CHANGED — local storage / bearer version:
    //res.json({ token });

    // res.cookie(name, value, options)
    res.cookie('token', token, {httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000});
    res.json({ok: true});

}));


router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ ok: true });
});

module.exports = router;