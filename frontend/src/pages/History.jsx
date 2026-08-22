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


function History() {

    const navigate = useNavigate();


    const [history, setHistory] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    useEffect(() => {

        loadHistory();

    }, []);


    async function loadHistory() {

        try {

            setLoading(true);

            const response =
                await getCaptionHistory();


            setHistory(
                response.data
            );

        } catch (error) {

            console.error(
                "History error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load history."
            );

        } finally {

            setLoading(false);

        }

    }


    if (loading) {

        return (
            <div className="page-loading">
                Loading your history...
            </div>
        );

    }


    return (

        <div className="inner-page">


            <div className="page-header">

                <div>

                    <h1>
                        Caption History
                    </h1>

                    <p>
                        All the captions you've generated.
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


            {history.length === 0 ? (

                <div className="empty-page">

                    <div className="empty-page-icon">
                        🕘
                    </div>

                    <h2>
                        No caption history
                    </h2>

                    <p>
                        Generate your first caption
                        to see it here.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Create Caption
                    </button>

                </div>

            ) : (

                <div className="history-grid">

                    {history.map(
                        (generation) => (

                            <div
                                className="history-card"
                                key={generation._id}
                            >


                                {/* Image */}

                                <img
                                    src={
                                        generation.imageUrl
                                    }
                                    alt="Generated"
                                />


                                {/* Content */}

                                <div className="history-content">

                                    <div className="history-date">

                                        {new Date(
                                            generation.createdAt
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )}

                                    </div>


                                    <p>
                                        {generation
                                            .captions?.[0]
                                            ?.text
                                        }
                                    </p>


                                    <span>

                                        {
                                            generation
                                                .captions
                                                ?.length
                                        } captions

                                    </span>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

}


export default History;