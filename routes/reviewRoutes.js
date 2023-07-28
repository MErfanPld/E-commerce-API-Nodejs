const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  createReview,
  deleteReview,
  getAllReview,
  getReview,
  updateReview,
} = require("../controllers/reviewController");

router.route("/").post(authenticateUser, createReview).get(getAllReview);
router
  .route("/:id")
  .get(getReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = router;
