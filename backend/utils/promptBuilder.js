function buildCaptionPrompt(
    preferences,
    previousCaptions = []
) {

    const {
        tone,
        length,
        emotion,
        style,
        emoji,
        hashtags
    } = preferences;


    let previousCaptionInstruction = "";


    // --------------------------------
    // Add previous captions
    // --------------------------------

    if (previousCaptions.length > 0) {

        previousCaptionInstruction = `

PREVIOUSLY GENERATED CAPTIONS:

${previousCaptions
    .map(
        (caption, index) =>
            `${index + 1}. ${caption.text}`
    )
    .join("\n")}


IMPORTANT:

Generate completely different captions.

Do not repeat or closely paraphrase any of the previous captions.

`;

    }


    return `
You are an expert Instagram content creator.

Analyze the uploaded image carefully.

Create Instagram captions based on what is actually visible in the image.

USER PREFERENCES:

Tone: ${tone}
Length: ${length}
Emotion: ${emotion}
Content Style: ${style}
Emoji Usage: ${emoji}
Hashtag Preference: ${hashtags}


CAPTION REQUIREMENTS:

- Generate exactly 3 different captions.
- Each caption must be relevant to the image.
- Follow the requested tone.
- Follow the requested length.
- Follow the requested emotion.
- Follow the requested content style.
- Make captions sound natural and human.
- Avoid generic AI-sounding phrases.
- Do not invent details that cannot reasonably be identified from the image.
- Make the three captions meaningfully different.


EMOJI REQUIREMENTS:

If emoji preference is "none", do not use emojis.

If emoji preference is "minimal", use very few emojis.

If emoji preference is "moderate", use a reasonable number of emojis.

If emoji preference is "lots", use emojis naturally.


HASHTAG REQUIREMENTS:

If hashtags are "none", return an empty hashtags array.

If hashtags are "few", return 2-4 relevant hashtags.

If hashtags are "moderate", return 5-8 relevant hashtags.

Do not generate unrelated hashtags.


${previousCaptionInstruction}
`;

}


module.exports = {
    buildCaptionPrompt
};