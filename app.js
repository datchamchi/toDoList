const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter = require("./routes/userRouter");
const workRouter = require("./routes/workRouter");
const errorHandler = require("./utils/errorHandle");

// app.use((req, res, next) => {
//   console.log(process.env.NODE_ENV);
//   next();
// });
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/works", workRouter);

app.use(errorHandler);
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Inconrect path",
  });
});

module.exports = app;
