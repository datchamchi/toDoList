const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Must have name to do"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    deadline: {
      type: Date,
      default: Date.now() + 10 * 60 * 1000,
    },
    status: {
      type: Boolean,
      default: true, //true is not
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
workSchema.pre("save", function (next) {
  if (this.deadline < Date.now()) this.status = false;
  next();
});

const Work = mongoose.model("Work", workSchema);
module.exports = Work;
