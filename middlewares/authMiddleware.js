const JWT_SECRET = require('../jwtKey');

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Get the generated token stored in cookie
    let token = req.cookies.auth;

    if ( token ) {
        // Verify the token
        jwt.verify(token, JWT_SECRET, function(err, token_data) {
            if (err) {
               return res.status(400).send('Invalid token');
            } else {
                // Store user data in req.user_data and continue other codes
                req.user_data = token_data.user;
                next();
            }
        });
        next();
    } else {
        // If the token is not set (user didn't logged in) 
        // => Redirect to login page
        res.redirect('/login');
    }
};

module.exports = verifyToken;