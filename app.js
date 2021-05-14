var mongoconnect = require("./api/db/database");
var createError = require("http-errors");
var express = require("express");
var app = express();
var userRouter = require("./api/routes/user.routes");
var timeout = require("connect-timeout");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var postRouter = require("./api/routes/post.routes");
const follow_unfollowRouter = require("./api/routes/follow_unfollow");
const likeRouter = require("./api/routes/like.routes");
const commentRouter = require("./api/routes/comment.routes");
const fileUpload = require("express-fileupload");

//firebaseAdmin
global.admin = require("firebase-admin");
const serviceAccount = require("./api/serviceAccountkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pixalive-fa208-default-rtdb.firebaseio.com/",
});

app.use(timeout("20s"));

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
app.use(fileUpload());
app.use(bodyParser.json({ limit: "50mb" }));

console.log("APP.JS LINE: 17");

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

//DatabaseConnection
connectDatabase();
function connectDatabase() {
  return new mongoconnect().connectToDb();
}

// router
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/follow_unfollow", follow_unfollowRouter);
app.use("/api/like", likeRouter);
app.use("/api/comments", commentRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(haltOnTimedout);
app.use(cookieParser());
app.use(haltOnTimedout);
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, authtoken, access_token, Accept, authorization"
  );
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
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

module.exports = app;
