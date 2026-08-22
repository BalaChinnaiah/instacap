const express = require("express");

const authController = require("../controllers/auth.controller");

const {
    uploadImage
} = require("../controllers/upload.controller");

const upload = require("../middlewares/upload.middleware");

const authMiddleware = require("../middlewares/auth.middleware");


const router = express.Router();


router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser)
router.post("/logout", authController.logoutUser)

router.get(
    "/me",
    authMiddleware,
    authController.getCurrentUser
);



module.exports = router;