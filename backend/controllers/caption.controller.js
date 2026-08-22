const captionModel = require("../models/caption.model");

const {
    uploadFile, getImageBuffer
} = require("../services/storage.service");

const {
    generateCaptions, improveCaption
} = require("../services/ai.service");


async function generateCaption(req, res) {

    try {

        // -----------------------------
        // 1. Check image
        // -----------------------------

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload an image"
            });

        }


        // -----------------------------
        // 2. Get preferences
        // -----------------------------

        const {
            tone,
            length,
            emotion,
            style,
            emoji,
            hashtags
        } = req.body;


        if (
            !tone ||
            !length ||
            !emotion ||
            !style ||
            !emoji ||
            !hashtags
        ) {

            return res.status(400).json({
                message: "All caption preferences are required"
            });

        }


        // -----------------------------
        // 3. Upload image to ImageKit
        // -----------------------------

        const uploadedImage = await uploadFile(
            req.file
        );


        const imageUrl = uploadedImage.url;


        // -----------------------------
        // 4. Build preferences
        // -----------------------------

        const preferences = {

            tone,
            length,
            emotion,
            style,
            emoji,
            hashtags

        };


        // -----------------------------
        // 5. Generate captions with Gemini
        // -----------------------------

        const aiResponse = await generateCaptions(

            req.file.buffer,

            req.file.mimetype,

            preferences

        );


        // -----------------------------
        // 6. Save to MongoDB
        // -----------------------------

       const captionDocument = await captionModel.create({

            userId: req.user.userId,

            imageUrl,

            imageMimeType: req.file.mimetype,

            preferences,

            captions: aiResponse.captions

        });


        // -----------------------------
        // 7. Response
        // -----------------------------

        return res.status(201).json({

            message:
                "Captions generated successfully",

            data: captionDocument

        });

    }

    catch (error) {

        console.error(
            "Generate caption error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to generate captions",

            error: error.message

        });

    }

}

async function getCaptionHistory(req, res) {

    try {

        const captions = await captionModel
            .find({
                userId: req.user.userId
            })
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            message: "Caption history fetched successfully",

            data: captions

        });

    } catch (error) {

        console.error(
            "Get caption history error:",
            error
        );

        return res.status(500).json({

            message: "Failed to fetch caption history",

            error: error.message

        });
    }
}

async function getCaptionById(req, res) {

    try {

        const { id } = req.params;


        const caption = await captionModel.findOne({

            _id: id,

            userId: req.user.userId

        });


        if (!caption) {

            return res.status(404).json({

                message: "Caption generation not found"

            });

        }


        return res.status(200).json({

            message: "Caption fetched successfully",

            data: caption

        });

    } catch (error) {

        console.error(
            "Get caption error:",
            error
        );

        return res.status(500).json({

            message: "Failed to fetch caption",

            error: error.message

        });

    }
}

async function deleteCaption(req, res) {

    try {

        const { id } = req.params;


        const deletedCaption =
            await captionModel.findOneAndDelete({

                _id: id,

                userId: req.user.userId

            });


        if (!deletedCaption) {

            return res.status(404).json({

                message: "Caption generation not found"

            });

        }


        return res.status(200).json({

            message: "Caption deleted successfully"

        });

    } catch (error) {

        console.error(
            "Delete caption error:",
            error
        );

        return res.status(500).json({

            message: "Failed to delete caption",

            error: error.message

        });

    }
}

async function toggleFavorite(req, res) {

    try {

        const {
            captionId,
            generatedCaptionId
        } = req.params;


        const document =
            await captionModel.findOne({

                _id: captionId,

                userId: req.user.userId

            });


        if (!document) {

            return res.status(404).json({

                message: "Caption generation not found"

            });

        }


        const caption =
            document.captions.id(
                generatedCaptionId
            );


        if (!caption) {

            return res.status(404).json({

                message: "Generated caption not found"

            });

        }


        caption.isFavorite =
            !caption.isFavorite;


        await document.save();


        return res.status(200).json({

            message: caption.isFavorite
                ? "Caption added to favorites"
                : "Caption removed from favorites",

            data: caption

        });

    } catch (error) {

        console.error(
            "Favorite error:",
            error
        );

        return res.status(500).json({

            message: "Failed to update favorite",

            error: error.message

        });

    }
}

async function improveExistingCaption(req, res) {

    try {

        const {
            caption,
            instruction
        } = req.body;


        // Validate caption

        if (!caption) {

            return res.status(400).json({
                message: "Caption is required"
            });

        }


        // Validate instruction

        if (!instruction) {

            return res.status(400).json({
                message: "Instruction is required"
            });

        }


        // Call Gemini

        const improvedCaption =
            await improveCaption(
                caption,
                instruction
            );


        return res.status(200).json({

            message:
                "Caption improved successfully",

            data: {

                originalCaption: caption,

                improvedCaption

            }

        });

    } catch (error) {

        console.error(
            "Improve caption error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to improve caption",

            error: error.message

        });

    }
}

async function regenerateCaptions(req, res) {

    try {

        // --------------------------------
        // 1. Get caption generation ID
        // --------------------------------

        const { captionId } = req.body;


        if (!captionId) {

            return res.status(400).json({
                message: "Caption ID is required"
            });

        }


        // --------------------------------
        // 2. Find user's existing generation
        // --------------------------------

        const existingGeneration =
            await captionModel.findOne({

                _id: captionId,

                userId: req.user.userId

            });


        if (!existingGeneration) {

            return res.status(404).json({
                message: "Caption generation not found"
            });

        }


        // --------------------------------
        // 3. Download original image
        // --------------------------------

        const imageBuffer =
            await getImageBuffer(
                existingGeneration.imageUrl
            );


        // --------------------------------
        // 4. Generate new captions
        // --------------------------------

        const newCaptions =
            await generateCaptions(

                imageBuffer,

                existingGeneration.imageMimeType,

                existingGeneration.preferences,

                existingGeneration.captions

            );


        // --------------------------------
        // 5. Add new captions to existing document
        // --------------------------------

        existingGeneration.captions.push(
            ...newCaptions.captions
        );


        // --------------------------------
        // 6. Save MongoDB document
        // --------------------------------

        await existingGeneration.save();


        // --------------------------------
        // 7. Return only new captions
        // --------------------------------

        return res.status(200).json({

            message:
                "New captions generated successfully",

            data: newCaptions.captions

        });

    } catch (error) {

        console.error(
            "Regenerate captions error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to regenerate captions",

            error: error.message

        });

    }
}


module.exports = {
    generateCaption, getCaptionHistory, getCaptionById, deleteCaption , toggleFavorite, improveExistingCaption,
    regenerateCaptions
};