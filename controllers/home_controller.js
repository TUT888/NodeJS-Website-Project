const displayView = (req, res) => {
    res.render('index', {
        currentPage: 'home'
    });
}

module.exports = {
    displayView
};