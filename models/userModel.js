const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have name !"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "A user must have email"],
      validate: {
        validator: validator.isEmail,
        message: (prop) => `${prop} is not a valid email`,
      },
    },
    photo: String,
    password: {
      type: String,
      required: [true, "A user must have password"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "PasswordConfirm and Password are not same !!!",
      },
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
// userSchema.pre(/^find/, function (next) {
//   console.log(this.works);
//   next();
// });
userSchema.virtual("works", {
  ref: "Work",
  foreignField: "user",
  localField: "_id",
});

const User = mongoose.model("User", userSchema);
module.exports = User;
