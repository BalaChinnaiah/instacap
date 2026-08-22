const express = require("express");

const {
    uploadImage
} = require("../controllers/upload.controller");

const upload = require("../middlewares/upload.middleware");

const authMiddleware = require("../middlewares/auth.middleware");


const router = express.Router();


router.post(
    "/image",
    authMiddleware,
    upload.single("image"),
    uploadImage
);


module.exports = router;