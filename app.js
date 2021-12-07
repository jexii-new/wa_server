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
var authMiddleware = require('./middleware')
var session = require('express-session')
var axios = require('axios')
__dirname = path.resolve();

// coonect
connect()

async function runWa(){
  await usersRouter.run('reset').catch(async err => {
    console.log('err')
  } )
}
app.use('/reconnect', async (req, res, next) => {
	await runWa()
	res.redirect('/setting')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 24 * 30 }}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/wa', usersRouter.router);
app.use(authMiddleware)
app.use('/', indexRouter,);
app.use('/start', async (req, res, next) => {
  await getProfile(async ({domain}) => {
    await removeProfile( async () => {
      await axios.get(`${domain}/wa/close`).then(async res => {
        console.log(res.data)
        })
    })
    await res.redirect('/setting')
    })

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



runWa()
job()

app.listen(process.env.PORT || 5000, () => console.log('running'))