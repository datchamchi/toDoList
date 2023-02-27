const Work = require("./../models/workModel");
const WorkFeature = require("./../utils/workFeature");
// const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.createNewWork = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const work = await Work.create(req.body);
  res.status(200).json({
    stattus: "success",
    data: work,
  });
});
exports.reloadData = catchAsync(async (req, res, next) => {
  let works = await Work.find({});
  works.forEach(async (el) => {
    if (el.deadline < Date.now()) el.status = false;
    return el.save({ validateBeforeSave: false });
  });
  works = await Promise.all(works);
  next();
});
exports.getAllWork = catchAsync(async (req, res, next) => {
  // let works = await new WorkFeature(Work.find(), req.query).sorted();
  const works = await new WorkFeature(Work.find(), req.query)
    .filter()
    .sorted()
    // .paginate()
    .limitField()
    .query.find({ user: req.user.id });

  res.status(200).json({
    status: "sucess",
    length: works.length,
    data: works,
  });
});
exports.updateWork = catchAsync(async (req, res, next) => {
  const newWork = await Work.findByIdAndUpdate(req.params.workId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    message: "sucess",
    data: newWork,
  });
});
exports.deleteWork = catchAsync(async (req, res, next) => {
  await Work.findByIdAndDelete(req.params.workId);
  res.status(204).json({
    status: "sucess",
    data: null,
  });
});
