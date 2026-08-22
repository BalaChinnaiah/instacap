import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
    useNavigate
} from "react-router-dom";

import ImageUploader from "../components/ImageUploader";
import CaptionPreferences from "../components/CaptionPreference";

import CaptionCard
    from "../components/CaptionCard";

import ImproveModal
    from "../components/ImproveModal";


import {
    generateCaptions, regenerateCaptions, improveCaption
} from "../services/caption.services";

import "../styles/dashboard.css";


function Dashboard() {

    const navigate = useNavigate();

    const {
        user,
        logoutUser
    } = useAuth();


    const [selectedImage, setSelectedImage] =
        useState(null);


    const [preferences, setPreferences] =
        useState({
            tone: "casual",
            length: "short",
            emotion: "happy",
            style: "general",
            emoji: "minimal",
            hashtags: "few"
        });


    const [captions, setCaptions] =
        useState([]);


    const [generating, setGenerating] =
        useState(false);


    const [error, setError] =
        useState("");

    const [generationId, setGenerationId] =
    useState(null);

    const [improveCaptionData, setImproveCaptionData] =
    useState(null);


    function handleImageSelect(file) {

        setSelectedImage(file);

        setError("");

    }


    function handlePreferenceChange(
        name,
        value
    ) {

        setPreferences(previous => ({
            ...previous,
            [name]: value
        }));

    }


    async function handleGenerate() {

    if (!selectedImage) {

        setError(
            "Please select an image first."
        );

        return;

    }


    setError("");

    setGenerating(true);


    try {

        const response =
            await generateCaptions(
                selectedImage,
                preferences
            );


        /*
        |--------------------------------------------------------------------------
        | Store generation ID
        |--------------------------------------------------------------------------
        */

        setGenerationId(
            response.data._id
        );


        /*
        |--------------------------------------------------------------------------
        | Store captions
        |--------------------------------------------------------------------------
        */

        setCaptions(
            response.data.captions
        );


    } catch (error) {

        console.error(
            "Generate caption error:",
            error
        );


        setError(
            error.response?.data?.message ||
            "Failed to generate captions."
        );

    } finally {

        setGenerating(false);

    }

    }

    async function handleRegenerate() {

    if (!generationId) {

        setError(
            "No caption generation found."
        );

        return;

    }


    setError("");

    setGenerating(true);


    try {

        const response =
            await regenerateCaptions(
                generationId
            );


        /*
        |--------------------------------------------------------------------------
        | Replace currently displayed captions
        |--------------------------------------------------------------------------
        */

        setCaptions(
            response.data
        );


    } catch (error) {

        console.error(
            "Regenerate error:",
            error
        );


        setError(
            error.response?.data?.message ||
            "Failed to regenerate captions."
        );

    } finally {

        setGenerating(false);

    }

    }


    async function handleLogout() {

        await logoutUser();

    }

    async function handleImprove(
    caption,
    instruction
) {

    try {

        const response =
            await improveCaption(
                caption.text,
                instruction
            );


        /*
        |--------------------------------------------------------------------------
        | Replace the caption locally
        |--------------------------------------------------------------------------
        */

        setCaptions(previousCaptions =>

            previousCaptions.map(
                currentCaption =>

                    currentCaption._id ===
                    caption._id

                        ? {
                            ...currentCaption,

                            text:
                                response
                                    .data
                                    .improvedCaption

                        }

                        : currentCaption
            )

        );


        setImproveCaptionData(null);


    } catch (error) {

        console.error(
            "Improve caption error:",
            error
        );


        setError(
            error.response?.data?.message ||
            "Failed to improve caption."
        );

    }

    }


    return (

        <div className="dashboard">





            {/* =========================
                MAIN CONTENT
            ========================= */}

            <div className="dashboard-content">


                {/* TOPBAR */}

                <header className="topbar">

                    <div>

                        <h1>
                            Create your caption
                        </h1>

                        <p>
                            Turn your photos into engaging
                            Instagram captions.
                        </p>

                    </div>


                    <div className="user-info">

                        <div className="avatar">

                            {user?.username
                                ?.charAt(0)
                                ?.toUpperCase()
                            }

                        </div>


                        <div>

                            <strong>
                                {user?.username}
                            </strong>

                            <span>
                                Creator
                            </span>

                        </div>

                    </div>

                </header>


                {/* WORKSPACE */}

                <main className="workspace">


                    {/* LEFT COLUMN */}

                    <section className="creation-column">


                        <div className="section-heading">

                            <div>

                                <h2>
                                    Upload your image
                                </h2>

                                <p>
                                    Choose a photo and let AI
                                    create the perfect caption.
                                </p>

                            </div>

                        </div>


                        <ImageUploader
                            onImageSelect={
                                handleImageSelect
                            }
                        />


                        <div className="preferences-card">

                            <CaptionPreferences
                                preferences={
                                    preferences
                                }

                                onPreferenceChange={
                                    handlePreferenceChange
                                }
                            />


                            {error && (

                                <div className="error-message">
                                    {error}
                                </div>

                            )}


                            <button
                                className="generate-button"
                                onClick={
                                    handleGenerate
                                }
                                disabled={generating}
                            >

                                {generating ? (

                                    <>
                                        <span className="spinner" />
                                        Generating...
                                    </>

                                ) : (

                                    <>
                                        ✨ Generate Captions
                                    </>

                                )}

                            </button>

                        </div>


                    </section>


                    {/* RIGHT COLUMN */}

                    <section className="results-column">


                        <div className="results-heading">

                            <div>

                                <h2>
                                    Your captions
                                </h2>

                                <p>
                                    AI-generated captions will
                                    appear here.
                                </p>

                            </div>

                            {captions.length > 0 && (

                                <span className="caption-count">
                                    {captions.length} captions
                                </span>

                            )}

                        </div>


                        {captions.length === 0 ? (

                            <div className="empty-results">

                                <div className="empty-icon">
                                    ✨
                                </div>

                                <h3>
                                    Nothing here yet
                                </h3>

                                <p>
                                    Upload an image and generate
                                    your first captions.
                                </p>

                            </div>

                        ) : (

                            <div className="caption-list">

                                {captions.map(
                                    (caption, index) => (

                                        <CaptionCard
                                            key={
                                                caption._id ||
                                                index
                                            }

                                            caption={{
                                                ...caption,

                                                position: index + 1
                                            }}

                                            generationId={
                                                generationId
                                            }

                                            onImprove={
                                                (caption) =>
                                                    setImproveCaptionData(
                                                        caption
                                                    )
                                            }

                                            onRegenerate={
                                                handleRegenerate
                                            }

                                        />

                                    )
                                )}

                            </div>

                        )}

                    </section>


                </main>

            </div>
            
            {improveCaptionData && (

                <ImproveModal

                    caption={
                        improveCaptionData
                    }

                    onClose={() =>
                        setImproveCaptionData(null)
                    }

                    onImprove={
                        handleImprove
                    }

                />

            
            )}

        </div>

    );

}


export default Dashboard;