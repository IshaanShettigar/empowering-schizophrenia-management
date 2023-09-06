const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authMiddleware = (req, res, next) => {
    // Get the token from the auth header if present, if not then throw error
    const authHeader = req.headers.authorization
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Error('Authentication invalid') // will be refactored later
    }
    const token = authHeader.split(' ')[1]
    // verify the token, if it fails, then throw error, if it succeeds proceed to next middleware or controller (call next)
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(`Payload after  verifying jwt ${payload}`);
        req.user = { userId: payload.userId, username: payload.username }
        next()
    }
    catch (error) {
        throw new Error('Failed to verify JWT')
    }

}

module.exports = authMiddleware