const express = require("express");

const router = express.Router();

const userController = require("./../controller/userController");
const workRouter = require("./workRouter");

router.use("/:userId/works", workRouter);
router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router.get("/:userId", userController.getUser);
module.exports = router;
