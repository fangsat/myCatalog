const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const { User } = require('../models');

router.get('/', requireAuth, async(req, res) => {
    try{
        const user = await User.findByPk(req.user.sub, { attributes : ['id', 'email', 'name', 'role', 'deleted_at'] });

        if (!user || user.deleted_at){
            return res.status(401).json({error : 'Account Unavailable'});
        }
        
        res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
        //res.json({ user: user });
        // same as res.json ( {user} );
    } catch (err) {
        console.error(err);
        res.status(500).json({error : 'Failed to load user'});
    }
});

module.exports = router;
