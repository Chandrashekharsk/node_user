const express = require("express");
const router = express.Router();
const {
  currentUser,
  deleteUser,
  forgetpassword,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateToken");

// router.route("/").get(getAllUsers).post(createUser)
router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(validateToken);
router.get("/currentuser", currentUser);
router.patch("/forgetpassword", forgetpassword);
router.delete("/deleteuser", deleteUser);

module.exports = router;
