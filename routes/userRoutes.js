const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  showCurrentUser,
  updatePasswordUser,
  updateUser,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/:id").get(authenticateUser, getUser);

router.route("/show_me").get(authenticateUser, showCurrentUser);
router.route("/update_user").patch(authenticateUser, updateUser);
router.route("/update_password").patch(authenticateUser, updatePasswordUser);

module.exports = router;
