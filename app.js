const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const expenseRouter = require('./routes/expense-route')

const session = require('express-session');
const passport = require('passport');

const mongoose = require('mongoose')

require('dotenv').config()

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: "doesn't matter in our case", // but it's required
  resave: false,
  saveUninitialized: false, // don't create cookie for non-logged-in user
  // MongoStore makes sure the user stays logged in also when the server restarts
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api', expenseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
