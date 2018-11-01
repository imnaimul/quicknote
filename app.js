const express = require('express');
const app = express();
const chalk = require('chalk');
const mongoose = require('mongoose');
const ejs = require('ejs');
const morgan = require('morgan');
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

// middlewares
process.env.NODE_ENV = 'development';
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret: "M4gn3t_",
    resave: true,
    saveUninitialized: true
}));


// connect to database
mongoose.connect('mongodb://localhost/note_app', {useNewUrlParser: true})
    .then(() => debug(chalk.green('Sucessfully connected to database')))
    .catch((err) => {debug(chalk.red(err))});

// middleware for flash messages
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("successMsg");
    res.locals.errorMsg = req.flash("errorMsg");
    next();
});

// routes
const routes = require('./routes');
app.use(routes);

app.listen(process.env.PORT, () => {
    debug(chalk.blue(`Server listening at port ${process.env.PORT}`));
});