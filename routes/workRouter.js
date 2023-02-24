const express = require("express");

const router = express.Router({ mergeParams: true });

const workController = require("./../controller/workController");

router
  .route("/:workId")
  .delete(workController.deleteWork)
  .patch(workController.updateWork);
router.use(workController.reloadData);
router
  .route("/")
  .post(workController.createNewWork)
  .get(workController.getAllWork);

module.exports = router;
