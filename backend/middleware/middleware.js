const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
// var User = import('../models/user.js')

const authenticateToken =  async (req, res, next) =>{
    try {
        console.log(" ===== authenticateToken middleware called =====")
        
        const token = req.headers['authorization'];
    
        if (!token) return res.sendStatus(401)
    
        const decoded = await jwt.verify(token, 'edhf345h876hrh587i#@485&345&$(*&)4543jggekrer');
        req.user = decoded.user;
        next()
    // }
    } catch (error) {
        console.log("middleware error : ", error)
    }
}

module.exports = { authenticateToken };
