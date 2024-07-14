var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var historiesRouter = require('./routes/histories');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: 'http://localhost:3000', // FRONTEND WEBISITE URL
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// --- Routing ---
app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/histories', historiesRouter);

module.exports = app;
