const { GoogleGenAI } = require("@google/genai");

const { buildCaptionPrompt } = require("../utils/promptBuilder");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


async function generateCaptions(
    imageBuffer,
    mimeType,
    preferences,
    previousCaptions = []
) {

    try {

        const prompt = buildCaptionPrompt(
            preferences,
            previousCaptions
        );


        const base64Image = imageBuffer.toString(
            "base64"
        );


        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: [
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: base64Image
                    }
                },

                {
                    text: prompt
                }
            ],

            config: {
                responseMimeType: "application/json",

                responseSchema: {
                    type: "object",

                    properties: {

                        captions: {
                            type: "array",

                            items: {
                                type: "object",

                                properties: {

                                    text: {
                                        type: "string"
                                    },

                                    hashtags: {
                                        type: "array",

                                        items: {
                                            type: "string"
                                        }
                                    }

                                },

                                required: [
                                    "text",
                                    "hashtags"
                                ]
                            }
                        }

                    },

                    required: [
                        "captions"
                    ]
                }
            }

        });


        console.log(
            "Gemini response:",
            response.text
        );


        return JSON.parse(
            response.text
        );

    } catch (error) {

        console.error(
            "Gemini API Error:",
            error
        );

        throw error;
    }
}

async function improveCaption(
    caption,
    instruction
) {

    try {

        const prompt = `
You are an expert Instagram caption editor.

Improve the following Instagram caption according to the user's instruction.

ORIGINAL CAPTION:
"${caption}"

USER INSTRUCTION:
"${instruction}"


RULES:

- Preserve the original meaning unless the instruction specifically asks to change it.
- Make the result sound natural and human.
- Do not explain what you changed.
- Return only the improved caption.
- Do not wrap the caption in quotation marks.

IMPROVED CAPTION:
`;


        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: [
                {
                    text: prompt
                }
            ]

        });


        return response.text.trim();

    } catch (error) {

        console.error(
            "Gemini improve caption error:",
            error
        );

        throw error;
    }
}


module.exports = {
    generateCaptions, improveCaption
};