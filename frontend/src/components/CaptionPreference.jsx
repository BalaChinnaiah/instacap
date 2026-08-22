function CaptionPreferences({
    preferences,
    onPreferenceChange
}) {


    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        onPreferenceChange(
            name,
            value
        );

    }


    return (

        <div>

            <h3>
                Caption preferences
            </h3>


            <div className="preference-grid">


                <div className="preference-field">

                    <label>
                        Tone
                    </label>

                    <select
                        name="tone"
                        value={preferences.tone}
                        onChange={handleChange}
                    >

                        <option value="casual">
                            Casual
                        </option>

                        <option value="professional">
                            Professional
                        </option>

                        <option value="funny">
                            Funny
                        </option>

                        <option value="creative">
                            Creative
                        </option>

                        <option value="romantic">
                            Romantic
                        </option>

                    </select>

                </div>


                <div className="preference-field">

                    <label>
                        Length
                    </label>

                    <select
                        name="length"
                        value={preferences.length}
                        onChange={handleChange}
                    >

                        <option value="short">
                            Short
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="long">
                            Long
                        </option>

                    </select>

                </div>


                <div className="preference-field">

                    <label>
                        Emotion
                    </label>

                    <select
                        name="emotion"
                        value={preferences.emotion}
                        onChange={handleChange}
                    >

                        <option value="happy">
                            Happy
                        </option>

                        <option value="excited">
                            Excited
                        </option>

                        <option value="calm">
                            Calm
                        </option>

                        <option value="romantic">
                            Romantic
                        </option>

                        <option value="nostalgic">
                            Nostalgic
                        </option>

                    </select>

                </div>


                <div className="preference-field">

                    <label>
                        Style
                    </label>

                    <select
                        name="style"
                        value={preferences.style}
                        onChange={handleChange}
                    >

                        <option value="general">
                            General
                        </option>

                        <option value="travel">
                            Travel
                        </option>

                        <option value="food">
                            Food
                        </option>

                        <option value="fashion">
                            Fashion
                        </option>

                        <option value="fitness">
                            Fitness
                        </option>

                        <option value="lifestyle">
                            Lifestyle
                        </option>

                    </select>

                </div>


                <div className="preference-field">

                    <label>
                        Emoji
                    </label>

                    <select
                        name="emoji"
                        value={preferences.emoji}
                        onChange={handleChange}
                    >

                        <option value="none">
                            None
                        </option>

                        <option value="minimal">
                            Minimal
                        </option>

                        <option value="moderate">
                            Moderate
                        </option>

                        <option value="lots">
                            Lots
                        </option>

                    </select>

                </div>


                <div className="preference-field">

                    <label>
                        Hashtags
                    </label>

                    <select
                        name="hashtags"
                        value={preferences.hashtags}
                        onChange={handleChange}
                    >

                        <option value="none">
                            None
                        </option>

                        <option value="few">
                            Few
                        </option>

                        <option value="moderate">
                            Moderate
                        </option>

                    </select>

                </div>


            </div>

        </div>

    );

}


export default CaptionPreferences;