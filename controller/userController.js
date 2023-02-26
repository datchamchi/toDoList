const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find().populate({
    path: "works",
    select: "-password",
  });
  res.status(200).json({
    status: "success",
    data: users,
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate({
    path: "works",
  });

  if (!user) return next(new AppError("User is not be found", 404));
  res.status(200).json({
    status: "success",
    data: user,
  });
});
exports.createUser = catchAsync(async (req, res, next) => {
  res.status(403).json({
    message: "The path is not valid. Please access path: /signup",
  });
});
