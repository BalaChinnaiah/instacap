import api from "./api";


/*
|--------------------------------------------------------------------------
| Generate captions
|--------------------------------------------------------------------------
*/

async function generateCaptions(
    image,
    preferences
) {

    const formData = new FormData();


    formData.append(
        "image",
        image
    );


    formData.append(
        "tone",
        preferences.tone
    );


    formData.append(
        "length",
        preferences.length
    );


    formData.append(
        "emotion",
        preferences.emotion
    );


    formData.append(
        "style",
        preferences.style
    );


    formData.append(
        "emoji",
        preferences.emoji
    );


    formData.append(
        "hashtags",
        preferences.hashtags
    );


    const response = await api.post(
        "/captions/generate",
        formData
    );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| Favorite / Unfavorite caption
|--------------------------------------------------------------------------
*/

async function toggleFavorite(
    captionId,
    generatedCaptionId
) {

    const response = await api.patch(
        `/captions/${captionId}/favorite/${generatedCaptionId}`
    );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| Improve caption
|--------------------------------------------------------------------------
*/

async function improveCaption(
    caption,
    instruction
) {

    const response = await api.post(
        "/captions/improve",
        {
            caption,
            instruction
        }
    );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| Regenerate captions
|--------------------------------------------------------------------------
*/

async function regenerateCaptions(
    captionId
) {

    const response = await api.post(
        "/captions/regenerate",
        {
            captionId
        }
    );


    return response.data;

}

async function getCaptionHistory() {

    const response = await api.get(
        "/captions"
    );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

export {
    generateCaptions,
    toggleFavorite,
    improveCaption,
    regenerateCaptions,
    getCaptionHistory
};