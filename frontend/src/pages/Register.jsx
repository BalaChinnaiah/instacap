import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";

import "../styles/auth.css";


function Register() {

    const navigate = useNavigate();


    const {
        registerUser
    } = useAuth();


    const [
        formData,
        setFormData
    ] = useState({

        username: "",
        email: "",
        password: ""

    });


    const [
        error,
        setError
    ] = useState("");


    const [
        loading,
        setLoading
    ] = useState(false);


    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        setFormData(
            previous => ({

                ...previous,

                [name]: value

            })
        );

    }


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        setLoading(true);


        try {

            await registerUser(

                formData.username,

                formData.email,

                formData.password

            );


            navigate("/dashboard");


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to create your account."
            );


        } finally {

            setLoading(false);

        }

    }


    return (

        <div className="auth-page">


            <div className="auth-container">


                {/* =================================
                    BRAND PANEL
                ================================= */}

                <section className="auth-brand-panel">


                    <div className="auth-brand">

                        Insta<span>Cap</span>

                    </div>


                    <div className="auth-brand-content">

                        <h2>
                            Turn moments
                            <br />
                            into words.
                        </h2>


                        <p>
                            Upload a photo, choose
                            your vibe, and let AI
                            create captions made
                            for your post.
                        </p>


                        <div className="auth-features">


                            <div className="auth-feature">

                                <div className="auth-feature-icon">
                                    📸
                                </div>

                                Upload any image

                            </div>


                            <div className="auth-feature">

                                <div className="auth-feature-icon">
                                    🎨
                                </div>

                                Choose your vibe

                            </div>


                            <div className="auth-feature">

                                <div className="auth-feature-icon">
                                    🚀
                                </div>

                                Generate instantly

                            </div>


                        </div>

                    </div>


                    <div className="auth-brand-footer">

                        Your next post starts here.

                    </div>


                </section>


                {/* =================================
                    FORM PANEL
                ================================= */}

                <section className="auth-form-panel">


                    <div className="auth-form-container">


                        {/* Header */}

                        <div className="auth-form-header">

                            <h1>
                                Create your account
                            </h1>

                            <p>
                                Start creating better
                                captions in seconds.
                            </p>

                        </div>


                        {/* Error */}

                        {error && (

                            <div className="auth-error">

                                {error}

                            </div>

                        )}


                        {/* Form */}

                        <form
                            className="auth-form"
                            onSubmit={
                                handleSubmit
                            }
                        >


                            {/* Username */}

                            <div className="auth-field">

                                <label>
                                    Username
                                </label>


                                <input
                                    className="auth-input"
                                    type="text"
                                    name="username"
                                    placeholder="Your username"
                                    value={
                                        formData.username
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            {/* Email */}

                            <div className="auth-field">

                                <label>
                                    Email address
                                </label>


                                <input
                                    className="auth-input"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            {/* Password */}

                            <div className="auth-field">

                                <label>
                                    Password
                                </label>


                                <input
                                    className="auth-input"
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />


                                <span className="auth-hint">

                                    Use at least 6 characters.

                                </span>

                            </div>


                            {/* Submit */}

                            <button
                                className="auth-submit"
                                type="submit"
                                disabled={
                                    loading
                                }
                            >

                                {loading
                                    ? "Creating account..."
                                    : "Create account"
                                }

                            </button>


                        </form>


                        {/* Login */}

                        <div className="auth-switch">

                            Already have an account?

                            {" "}

                            <Link to="/login">
                                Sign in
                            </Link>

                        </div>


                    </div>


                </section>


            </div>

        </div>

    );

}


export default Register;