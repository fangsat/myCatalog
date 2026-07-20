const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const { User } = require('../models');

router.get('/', requireAuth, async(req, res) => {
    try{
        const user = await User.findByPk(req.user.sub, { attributes : ['id', 'email', 'name', 'role'] })

        if (!user || user.deleted_At){
            return res.status(401).json({error : 'Account Unavailable'});
        }

        res.json({ user });
        //res.json({ user: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({error : 'Failed to load user'});
    }
});

module.exports = router;
