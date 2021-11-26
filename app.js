var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');
var logger = require('morgan');
var cors =  require('cors');
var {job} = require('./cron')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var path = require('path')
var fs = require('fs')
var app = express();
var {getProfile, removeProfile} = require('./controllers/setting')
var {connect} = require('./conn')
__dirname = path.resolve();

// coonect
connect()

async function runWa(){
  await usersRouter.run().catch(async err => {
    console.log('err')
  } )
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/', indexRouter);
app.use('/wa', usersRouter.router);
app.use('/start', async (req, res, next) => {
  await removeProfile( async () => {
    usersRouter.run()
    await res.redirect('/setting')
  })
});


app.use('/reconnect', (req, res, next) => {
	usersRouter.run()
	res.redirect('/setting')
});

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



runWa()
job()


module.exports = app;
