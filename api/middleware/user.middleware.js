const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    if(token.startsWith('Bearer ')) {
        console.log(token)
        jwt.verify(token.split(' ')[1],'secret', (err, decoded)=> {
            if (err) {
                return res.status(401).json({error: 'Unauthorized'});
            }
        req.user = decoded;
        next();
    });
    } else {
        console.log(token)
        jwt.verify(token,'secret', (err, decoded)=> {
            if (err) {
                return res.status(401).json({error: 'Unauthorized'});
            }
        req.user = decoded;
        next();
    });
    }
  
};


module.exports = verifyToken