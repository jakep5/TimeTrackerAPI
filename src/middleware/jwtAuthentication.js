const AuthService = require('../auth/auth-service');

function requireAuthentication(req, res, next) {
    const authToken = req.get('Authorization') || '';

    let bearerToken;

    if (!authToken.toLowerCase.startsWith('bearer')) {
        return res.status(401).json({ error: 'Unauthorized request'})
    } else {
        bearerToken = authToken.slice(7, authToken.length);
    }

    console.log(bearerToken);
}

module.exports = { requireAuthentication };