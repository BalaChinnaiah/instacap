import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getCaptionHistory
} from "../services/caption.services";

import "../styles/history.css";


function Favorites() {

    const navigate = useNavigate();


    const [favorites, setFavorites] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    useEffect(() => {

        loadFavorites();

    }, []);


    async function loadFavorites() {

        try {

            setLoading(true);


            const response =
                await getCaptionHistory();


            /*
            |--------------------------------------------------------------------------
            | Extract favorite captions
            |--------------------------------------------------------------------------
            */

            const favoriteCaptions = [];


            response.data.forEach(
                generation => {

                    generation.captions?.forEach(
                        caption => {

                            if (
                                caption.isFavorite
                            ) {

                                favoriteCaptions.push({

                                    ...caption,

                                    imageUrl:
                                        generation.imageUrl,

                                    generationId:
                                        generation._id

                                });

                            }

                        }
                    );

                }
            );


            setFavorites(
                favoriteCaptions
            );


        } catch (error) {

            console.error(
                "Favorites error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load favorites."
            );

        } finally {

            setLoading(false);

        }

    }


    if (loading) {

        return (
            <div className="page-loading">
                Loading favorites...
            </div>
        );

    }


    return (

        <div className="inner-page">


            <div className="page-header">

                <div>

                    <h1>
                        Favorites
                    </h1>

                    <p>
                        Your saved captions.
                    </p>

                </div>


                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    + Generate
                </button>

            </div>


            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {favorites.length === 0 ? (

                <div className="empty-page">

                    <div className="empty-page-icon">
                        ❤️
                    </div>

                    <h2>
                        No favorites yet
                    </h2>

                    <p>
                        Save your favorite captions
                        and they'll appear here.
                    </p>

                </div>

            ) : (

                <div className="favorites-grid">

                    {favorites.map(
                        (caption) => (

                            <div
                                className="favorite-card"
                                key={
                                    caption._id
                                }
                            >


                                <img
                                    src={
                                        caption.imageUrl
                                    }
                                    alt="Favorite"
                                />


                                <div className="favorite-content">

                                    <div className="favorite-icon">
                                        ❤️
                                    </div>


                                    <p>
                                        {caption.text}
                                    </p>


                                    {caption.hashtags
                                        ?.length > 0 && (

                                        <div className="hashtags">

                                            {caption.hashtags.map(
                                                (
                                                    hashtag,
                                                    index
                                                ) => (

                                                    <span
                                                        key={
                                                            index
                                                        }
                                                    >
                                                        {hashtag}
                                                    </span>

                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

}


export default Favorites;