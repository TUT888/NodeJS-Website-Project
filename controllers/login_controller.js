const JWT_SECRET = require('../jwtKey');
const db = require('../connectDB');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10; // For hashing password

const displayLoginView = (req, res) => {
    res.render('login', {
        currentPage: 'login',
        status: "",
        name: ""
    })
}

const generateToken = (user) => {
    return jwt.sign({ user: user }, JWT_SECRET, { expiresIn: "1h" });
}

const userLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email == "" || password == "") {
        console.log("[Login - ERROR] One or more input is empty");
        res.render('login', {
            currentPage: 'login',
            status: "failed",
            name: ""
        })
    } else {
        let stmt = `SELECT * FROM Users WHERE email="${email}"`;
        db.all(stmt, function (err, rows) {
            if (err) {
                console.log("[Login - ERROR] There is an error when executing the statement");
                res.render('login', {
                    currentPage: 'login',
                    status: "failed",
                    name: ""
                })
                return console.error(err.message);
            } else if (rows.length === 0) {
                console.log("[Login - ERROR] No record of this user");
                res.render('login', {
                    currentPage: 'login',
                    status: "failed",
                    name: ""
                })
            } else {
                // Already got the user, now verify password
                let user = rows[0];
                bcrypt.compare(password, user.password, (err, result)=>{
                    if (err) {
                        console.log("[Login - ERROR] Password is invalid. Authentication failed!");
                        res.render('login', {
                            currentPage: 'login',
                            status: "failed",
                            name: ""
                        })
                    } else {
                        let generatedToken = generateToken(user);
                        console.log(`[Login - SUCCESS] Login successful`);
                        console.log(`[INFO] Generated Token: ${generatedToken}`);
                        // Set cookie
                        res.cookie('auth', generatedToken);
                        // Render login page
                        res.redirect('/');
                    }
                })
            }
        })
    }
}
const displayRegisterView = (req, res) => {
    res.render('register', {
        currentPage: 'register',
        status: "",
        name: ""
    })
}

const userRegister = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            res.render('register', {
                currentPage: 'register',
                status: "failed"
            })
        } else {
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    res.render('register', {
                        currentPage: 'register',
                        status: "failed"
                    })
                } else {
                    let stmt = `INSERT INTO Users(name, email, password) VALUES ("${name}", "${email}", "${hashedPassword}")`
                    db.run(stmt);
                    console.log(`Successfully registered! The hashed password for user ${email} with password ${password} is ${hashedPassword}`);
                    res.render('register', {
                        currentPage: 'register',
                        status: "success"
                    })
                }
            })
        }
    })
}

module.exports = {
    displayLoginView,
    userLogin,
    displayRegisterView,
    userRegister
};