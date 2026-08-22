const express = require("express");

const {
    generateCaption, getCaptionHistory, getCaptionById, deleteCaption, toggleFavorite, improveExistingCaption,
    regenerateCaptions
} = require("../controllers/caption.controller");

const upload = require("../middlewares/upload.middleware");

const authMiddleware = require("../middlewares/auth.middleware");


const router = express.Router();


router.post(
    "/generate",

    authMiddleware,

    upload.single("image"),

    generateCaption
);

router.post(
    "/regenerate",
    authMiddleware,
    regenerateCaptions
);

router.get(
    "/",
    authMiddleware,
    getCaptionHistory
);

router.get(
    "/:id",
    authMiddleware,
    getCaptionById
);

router.delete(
    "/:id",
    authMiddleware,
    deleteCaption
);

router.patch(
    "/:captionId/favorite/:generatedCaptionId",
    authMiddleware,
    toggleFavorite
);

router.post(
    "/improve",
    authMiddleware,
    improveExistingCaption
);


module.exports = router;