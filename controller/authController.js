const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("../utils/appError");
const { create } = require("../models/workModel");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: Date.now() + process.env.JWT_EXPIRE_IN * 24 * 60 * 60 * 1000,
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
  const token = createToken(user.id);
  res.status(200).json({
    status: "success",
    token,
    message: user,
  });
});
