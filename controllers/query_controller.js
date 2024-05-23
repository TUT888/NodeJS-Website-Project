const db = require('../connectDB');

const displayView = (req, res) => {
    res.render('queryform', {
        currentPage: 'queryform',
        isSubmit: false
    });
}

const submitQuery = (req, res) => {
    let fname = req.body.firstname;
    let lname = req.body.surname;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.states;
    let postcode = req.body.postcode;
    let querytype = req.body.queryType;
    let querydetail = req.body.queryDetail;

    console.log("Just received customer query through POST method!");
    console.log(`Data includes: 
    ${fname}", "${lname}", "${mobile}", "${email}", 
    "${address}", "${city}", "${state}", "${postcode}", 
    "${querytype}", "${querydetail}`);
    let stmt = db.run(`
        INSERT INTO CustomerQueries (fname, lname, mobile, email, address, city, state, postcode, querytype, querydetail) 
        VALUES ("${fname}", "${lname}", "${mobile}", "${email}", "${address}", "${city}", "${state}", "${postcode}", "${querytype}", "${querydetail}")
    `);

    res.render('queryform', {
        currentPage: 'queryform',
        isSubmit: true,
    })
}

const getQueries = (req, res) => {
    let stmt = `SELECT * FROM CustomerQueries`;
    db.all(stmt, function (err, rows) {
        res.render('querylist', {
            currentPage: 'queryform',
            error: err,
            queries: rows
        })
    })
}

module.exports = {
    displayView,
    submitQuery,
    getQueries
};