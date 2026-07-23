const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const asyncHandler = require('../utils/asyncHandler');
const { User } = require('../models');

router.get('/', requireAuth, asyncHandler(async(req, res) => {

    const user = await User.findByPk(req.user.sub, { attributes : ['id', 'email', 'name', 'role', 'deleted_at'] });
    //const user = await User.findByPk(req.user.sub, { attributes : ['id', 'email', 'name', 'role', 'deleted_at', 'this_column_does_not_exist'] });

    if (!user || user.deleted_at){
        return res.status(401).json({error : 'Account Unavailable'});
    }
        
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });

}));

module.exports = router;

//GOTCHA:
//res.json({ user: user });
// same as res.json ( {user} );