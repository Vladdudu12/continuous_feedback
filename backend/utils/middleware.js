const jwt = require('jsonwebtoken');
const {handleErrorResponse} = require('./utils'); 
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader?.split(' ')[1];

    if (!token) {
        return handleErrorResponse(res, null, 'Unauthorized - No token provided', 401);
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return handleErrorResponse(res, err, 'Unauthorized - No valik token', 401)
        }

        req.userId = decoded.id;

        next();
    })
}

module.exports = {
    verifyToken
}