const express = require("express");
const authController = require("./../controller/authController");

const router = express.Router();

const userController = require("./../controller/userController");
const workRouter = require("./workRouter");

router.use("/works", workRouter);
router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router.get("/:userId", userController.getUser);

router.post("/login", authController.logIn);
router.post("/signup", authController.signUp);
router.post("/logout", authController.logOut);

module.exports = router;
