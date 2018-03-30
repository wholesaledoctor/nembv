var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.use(favicon(path.join(__dirname,'public','favicon.ico')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// fe/dist/index.html 라우트 추가
app.use(express.static(path.join(__dirname, 'fe', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',require('./routes/api'));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send({success:false,msg:err.message});
});

const mongoose = require('mongoose');
const cfg = require('./cfg/cfg');

if (!cfg) {
  console.error('./cfg/cfg.js file not exists');
  process.exit(1);
}

const pg = require('./playGround');


mongoose.connect(cfg.db.url, (err) => {
  if (err) return console.error(err);
  console.log('mongoose connected');
  pg.test.model();
});

module.exports = app;
