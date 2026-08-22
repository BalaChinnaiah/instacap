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


function Login() {

    const navigate = useNavigate();


    const {
        loginUser
    } = useAuth();


    const [
        formData,
        setFormData
    ] = useState({

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

            await loginUser(

                formData.email,

                formData.password

            );


            navigate("/dashboard");


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Invalid email or password."
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
                            Your photos.
                            <br />
                            Better captions.
                        </h2>


                        <p>
                            Create engaging Instagram
                            captions powered by AI,
                            tailored to your style.
                        </p>


                        <div className="auth-features">


                            <div className="auth-feature">

                                <div className="auth-feature-icon">
                                    ✨
                                </div>

                                AI-powered captions

                            </div>


                            <div className="auth-feature">

                                <div className="auth-feature-icon">
                                    🎯
                                </div>

                                Personalized tone & style

                            </div>


                            <div className="auth-feature">

                                <div className="auth-feature-icon">
                                    📸
                                </div>

                                Understands your images

                            </div>


                        </div>

                    </div>


                    <div className="auth-brand-footer">

                        Create. Caption. Post.

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
                                Welcome back
                            </h1>

                            <p>
                                Sign in to continue
                                creating great captions.
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
                                    placeholder="Enter your password"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

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
                                    ? "Signing in..."
                                    : "Sign in"
                                }

                            </button>


                        </form>


                        {/* Register */}

                        <div className="auth-switch">

                            Don't have an account?

                            {" "}

                            <Link to="/register">
                                Create one
                            </Link>

                        </div>


                    </div>


                </section>


            </div>

        </div>

    );

}


export default Login;