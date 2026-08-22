import {
    useState
} from "react";


import {
    toggleFavorite
} from "../services/caption.services";


function CaptionCard({
    caption,
    generationId,
    onImprove,
    onRegenerate
}) {

    const [copied, setCopied] =
        useState(false);


    const [favorite, setFavorite] =
        useState(
            caption.isFavorite || false
        );


    const [favoriteLoading, setFavoriteLoading] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | Copy caption
    |--------------------------------------------------------------------------
    */

    async function handleCopy() {

        try {

            const textToCopy =
                caption.text;


            await navigator.clipboard.writeText(
                textToCopy
            );


            setCopied(true);


            setTimeout(() => {

                setCopied(false);

            }, 1500);

        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Favorite
    |--------------------------------------------------------------------------
    */

    async function handleFavorite() {

        if (favoriteLoading) {
            return;
        }


        setFavoriteLoading(true);


        try {

            const response =
                await toggleFavorite(
                    generationId,
                    caption._id
                );


            setFavorite(
                response.data.isFavorite
            );

        } catch (error) {

            console.error(
                "Favorite error:",
                error
            );

        } finally {

            setFavoriteLoading(false);

        }

    }


    return (

        <div className="caption-card">


            {/* Number */}

            <div className="caption-number">

                Caption {
                    String(
                        caption.position || ""
                    )
                }

            </div>


            {/* Caption */}

            <p className="caption-text">

                {caption.text}

            </p>


            {/* Hashtags */}

            {caption.hashtags?.length > 0 && (

                <div className="hashtags">

                    {caption.hashtags.map(
                        (
                            hashtag,
                            index
                        ) => (

                            <span
                                key={index}
                            >
                                {hashtag}
                            </span>

                        )
                    )}

                </div>

            )}


            {/* Actions */}

            <div className="caption-actions">


                <button
                    onClick={handleCopy}
                    className={
                        copied
                            ? "action-active"
                            : ""
                    }
                >

                    {copied
                        ? "✓ Copied"
                        : "📋 Copy"
                    }

                </button>


                <button
                    onClick={handleFavorite}
                    disabled={favoriteLoading}
                    className={
                        favorite
                            ? "action-active"
                            : ""
                    }
                >

                    {favorite
                        ? "❤️"
                        : "♡"
                    }

                </button>


                <button
                    onClick={() =>
                        onImprove(caption)
                    }
                >
                    ✨ Improve
                </button>


                <button
                    onClick={onRegenerate}
                >
                    🔄 Regenerate
                </button>


            </div>

        </div>

    );

}


export default CaptionCard;