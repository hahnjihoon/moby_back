var express = require("express");
var app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require("./routes/index"); //예시
// var usersRouter = require("./routes/users"); //예시

// app.set("views", path.join(__dirname, "views")); //템플릿파일루트(view)
// app.set("view engine", "jade"); //템플릿파일루트(view)
const Products = require("./routes/products.js");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
// app.use(cors());
app.use(
  cors({
    origin: ["http://192.168.0.137:3000", "http://localhost:3000"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true
  })
);

app.use("/products", Products);

app.get("/", function (req, res) {
  res.send("moby_backend_server");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
