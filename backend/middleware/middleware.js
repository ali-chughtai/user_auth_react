const jwt = require('jsonwebtoken');
var User = import('../models/user.js')

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'edhf345h876hrh587i#@485&345&$(*&)4543jggekrer', (err, user) => {
        if (err) return res.sendStatus(403);
        if (!user) return res.sendStatus(404);
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
