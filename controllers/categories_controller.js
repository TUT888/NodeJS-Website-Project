const db = require('../connectDB');

const getAllProducts = (req, res) => {
    let selectedCategory = req.params.cateName;
    let stmt = `SELECT * FROM Products WHERE type='${selectedCategory}'`;
    db.all(stmt, function (err, rows) {
        res.send(rows);
    });
}

const displayView = (req, res) => {
    res.render('categories', {
        currentPage: 'categories',
        products: [],
        selectedCategory: ""
    });
}

const displayAllByDefault = (req, res) => {
    let selectedCategory = "painting";
    let stmt = `SELECT * FROM Products WHERE type='${selectedCategory}'`;
    db.all(stmt, function (err, rows) {
        res.render('categories', {
            currentPage: 'categories',
            products: rows,
            selectedCategory: selectedCategory
        });
    });
}

const displayAllByCategory = (req, res) => {
    let selectedCategory = req.params.cateName;
    let stmt = `SELECT * FROM Products WHERE type='${selectedCategory}'`;
    db.all(stmt, function (err, rows) {
        res.render('categories', {
            currentPage: 'categories',
            products: rows,
            selectedCategory: selectedCategory
        });
    });
}

const displayProduct = (req, res) => {
    let productID = req.params.productID;
    let stmt = `SELECT * FROM Products WHERE id='${productID}'`;
    db.all(stmt, function (err, rows) {
        res.render('product', {
            currentPage: 'categories',
            products: rows
        });
    });
}

module.exports = {
    displayView,
    displayAllByDefault,
    displayAllByCategory,
    displayProduct,
    getAllProducts
};