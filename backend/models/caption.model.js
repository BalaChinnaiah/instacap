const mongoose = require("mongoose");

const generatedCaptionSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },

        hashtags: {
            type: [String],
            default: []
        },

        isFavorite: {
            type: Boolean,
            default: false
        }
    },
    {
        _id: true
    }
);


const captionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        // ADD THIS
        imageMimeType: {
            type: String,
            required: true
        },

        preferences: {
            tone: {
                type: String,
                required: true
            },

            length: {
                type: String,
                required: true
            },

            emotion: {
                type: String,
                required: true
            },

            style: {
                type: String,
                required: true
            },

            emoji: {
                type: String,
                required: true
            },

            hashtags: {
                type: String,
                required: true
            }
        },

        captions: {
            type: [generatedCaptionSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);


const captionModel = mongoose.model(
    "Caption",
    captionSchema
);


module.exports = captionModel;