const jwt = require('jsonwebtoken');

function requireAuth(req, res, next){

    // local storage / bearer version:
    // const authHeader = req.headers.authorization || '';
    // const [scheme, token]  = authHeader.split(' ');
    // // const scheme = authHeader.split(' ')[0];
    // // const token = authHeader.split(' ')[1];

    // if (scheme !== 'Bearer' || !token){
    //     return res.status(401).json({error: 'Not logged in'});
    // }

    // httpOnly cookie version:
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ error : 'Not logged in' }); 
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET,
            {algorithms : ['HS256']},
        );
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name ==='TokenExpiredError'){
            return res.status(401).json({error: 'Session expired, please log in again'});
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = requireAuth;