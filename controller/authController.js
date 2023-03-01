const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("../utils/appError");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN * 24 * 60 * 60 * 1000,
  });
};
const sendCookie = (user, statusCode, res) => {
  const jwt = createToken(user.id);
  let cookieOptions = {
    maxAge: process.env.COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", jwt, cookieOptions);
  res.status(statusCode).json({
    status: "sucess",
    data: user,
  });
};
exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: "success",
    data: user,
  });
});
exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password"));
  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(
      new AppError("The password is not correct! Please login again...", 401)
    );
  sendCookie(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt)
    return next(
      new AppError(
        "You are not loggin! Please login to implement this action..",
        401
      )
    );
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return next(new AppError("JWt is not valid. Try again..", 401));
  const currentUser = await User.findById(decoded.id);
  req.user = currentUser;
  next();
});
exports.logOut = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    maxAge: 1000,
    httpOnly: true,
  });
  res.status(200).json({
    status: "sucess",
    message: "Log out succesfully !!",
  });
});
