const db = require('../connectDB');

// Display user view
const displayView = (req, res) => {
    let user_data = req.user_data;
    res.render('user', {
        currentPage: 'user',
        user: user_data
    })
}

// Logout, clear cookies and redirect to home page
const userLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}

module.exports = {
    displayView,
    userLogout
}