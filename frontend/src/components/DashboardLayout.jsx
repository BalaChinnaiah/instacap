import {
    useState
} from "react";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";


function DashboardLayout({
    children
}) {

    const navigate = useNavigate();

    const location = useLocation();


    const {
        user,
        logoutUser
    } = useAuth();


    const [
        sidebarOpen,
        setSidebarOpen
    ] = useState(false);


    // --------------------------------
    // Navigation
    // --------------------------------

    function navigateTo(path) {

        navigate(path);

        // Close sidebar after navigation
        // This is especially useful on mobile

        setSidebarOpen(false);

    }


    // --------------------------------
    // Logout
    // --------------------------------

    async function handleLogout() {

        await logoutUser();

        navigate("/login");

        setSidebarOpen(false);

    }


    return (

        <div className="dashboard">


            {/* =================================
                MOBILE SIDEBAR OVERLAY
            ================================= */}

            {sidebarOpen && (

                <div
                    className="sidebar-overlay"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                />

            )}


            {/* =================================
                SIDEBAR
            ================================= */}

            <aside
                className={
                    sidebarOpen
                        ? "sidebar sidebar-open"
                        : "sidebar"
                }
            >


                {/* =============================
                    SIDEBAR HEADER
                ============================= */}

                <div className="sidebar-header">


                    {/* Logo */}

                    <div className="brand">

                        Insta<span>Cap</span>

                    </div>


                    {/* Mobile Close Button */}

                    <button
                        className="sidebar-close"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >

                        ×

                    </button>


                </div>


                {/* =============================
                    NAVIGATION
                ============================= */}

                <nav className="sidebar-nav">


                    {/* Generate */}

                    <button
                        className={
                            location.pathname ===
                            "/dashboard"

                                ? "nav-item active"

                                : "nav-item"
                        }

                        onClick={() =>
                            navigateTo(
                                "/dashboard"
                            )
                        }
                    >

                        <span>
                            ✨
                        </span>

                        Generate

                    </button>


                    {/* History */}

                    <button
                        className={
                            location.pathname ===
                            "/history"

                                ? "nav-item active"

                                : "nav-item"
                        }

                        onClick={() =>
                            navigateTo(
                                "/history"
                            )
                        }
                    >

                        <span>
                            🕘
                        </span>

                        History

                    </button>


                    {/* Favorites */}

                    <button
                        className={
                            location.pathname ===
                            "/favorites"

                                ? "nav-item active"

                                : "nav-item"
                        }

                        onClick={() =>
                            navigateTo(
                                "/favorites"
                            )
                        }
                    >

                        <span>
                            ❤️
                        </span>

                        Favorites

                    </button>


                </nav>


                {/* =============================
                    SIDEBAR BOTTOM
                ============================= */}

                <div className="sidebar-bottom">


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>


                </div>


            </aside>


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <div className="dashboard-content">


                {/* =============================
                    TOPBAR
                ============================= */}

                <header className="topbar">


                    {/* Mobile Menu Button */}

                    <button
                        className="mobile-menu-button"
                        onClick={() =>
                            setSidebarOpen(true)
                        }
                    >

                        ☰

                    </button>


                    {/* Page / App Title */}

                    <div className="topbar-title">

                        <h1>
                            InstaCap
                        </h1>

                        <p>
                            AI-powered Instagram
                            captions.
                        </p>

                    </div>


                    {/* =========================
                        USER INFO
                    ========================= */}

                    <div className="user-info">


                        {/* Avatar */}

                        <div className="avatar">

                            {user?.username
                                ?.charAt(0)
                                ?.toUpperCase()
                            }

                        </div>


                        {/* User Details */}

                        <div className="user-details">

                            <strong>
                                {user?.username}
                            </strong>

                            <span>
                                Creator
                            </span>

                        </div>


                    </div>


                </header>


                {/* =================================
                    PAGE CONTENT
                ================================= */}

                {children}


            </div>


        </div>

    );

}


export default DashboardLayout;