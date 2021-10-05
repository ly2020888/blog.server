var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const { syncAllModel } = require("./database/models")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passageRouter = require('./routes/passage');


var app = express();

app.use(session({
  secret: '296245702',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,maxAge: 60000*10}
}))

app.all("*",function(req,res,next){
  res.header("Access-Control-Allow-Origin","http://localhost:4000");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.sendStatus(200)
  else
      next();
})
syncAllModel();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/passage', passageRouter);
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
  res.render('error');
});

module.exports = app;
