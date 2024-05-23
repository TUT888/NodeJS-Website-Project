// ------ Set Up ------ // 
const { error } = require('console');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;
app.use(morgan("common"));
app.use(express.static("public"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// For user login/logout authentication
var cookieParser = require('cookie-parser');
app.use(cookieParser())

// ------ Separate routers ------ //
const home = require('./routers/home_router');
const login = require('./routers/login_router');
const categories = require('./routers/categories_router');
const query = require('./routers/query_router');
const user = require('./routers/user_router');

app.use(home);
app.use(login);
app.use(categories);
app.use(query);
app.use(user);

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, () => {
    // When the application starts, print to the console that our app is
    // running at http://localhost:3000. Print another message indicating
    // how to shut the server down.
    console.log(`Web server running at: http://localhost:${port}`)
    console.log(`Type Ctrl+C to shut down the web server`)
})