import {
    useState
} from "react";


function ImproveModal({
    caption,
    onClose,
    onImprove
}) {

    const [instruction, setInstruction] =
        useState("");


    const [loading, setLoading] =
        useState(false);


    async function handleSubmit(event) {

        event.preventDefault();


        if (!instruction.trim()) {
            return;
        }


        setLoading(true);


        try {

            await onImprove(
                caption,
                instruction
            );


        } finally {

            setLoading(false);

        }

    }


    return (

        <div className="modal-overlay">


            <div className="improve-modal">


                <div className="modal-header">

                    <div>

                        <h2>
                            Improve caption
                        </h2>

                        <p>
                            Tell AI how you'd like
                            to improve it.
                        </p>

                    </div>


                    <button
                        onClick={onClose}
                        className="modal-close"
                    >
                        ×
                    </button>

                </div>


                {/* Original caption */}

                <div className="original-caption">

                    <span>
                        Original
                    </span>

                    <p>
                        {caption.text}
                    </p>

                </div>


                {/* Quick options */}

                <div className="quick-options">

                    <button
                        type="button"
                        onClick={() =>
                            setInstruction(
                                "Make it more Gen-Z"
                            )
                        }
                    >
                        🔥 Gen-Z
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            setInstruction(
                                "Make it funnier"
                            )
                        }
                    >
                        😂 Funnier
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            setInstruction(
                                "Make it more creative"
                            )
                        }
                    >
                        ✨ Creative
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            setInstruction(
                                "Make it shorter"
                            )
                        }
                    >
                        ✂️ Shorter
                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                >

                    <textarea
                        value={instruction}
                        onChange={(event) =>
                            setInstruction(
                                event.target.value
                            )
                        }
                        placeholder="Example: Make it sound like a travel influencer..."
                    />


                    <div className="modal-actions">

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={
                                loading ||
                                !instruction.trim()
                            }
                        >

                            {loading
                                ? "Improving..."
                                : "✨ Improve Caption"
                            }

                        </button>

                    </div>

                </form>


            </div>

        </div>

    );

}


export default ImproveModal;