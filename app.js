var mongoconnect = require("./api/db/database")
var createError = require('http-errors');
var express = require('express');
var app = express();
var userRouter = require("./api/routes/user.routes")
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(timeout('20s'));


app.use(bodyParser.json({limit: '50mb'}));

console.log("APP.JS LINE: 17")

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//DatabaseConnection
connectDatabase();
function connectDatabase(){
    return new mongoconnect().connectToDb();
}

// router
app.use('/api/user',userRouter);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(haltOnTimedout);
app.use(cookieParser());
app.use(haltOnTimedout);
app.use(cors());
app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, authtoken, access_token, Accept, authorization");
		res.header("Access-Control-Allow-Methods", "*");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next()
}

module.exports = app;
