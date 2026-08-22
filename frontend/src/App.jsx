import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Favorites from "./pages/Favorites";


import ProtectedRoute
    from "./routes/ProtectedRoute";


import DashboardLayout
    from "./components/DashboardLayout";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* Default */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


                {/* Authentication */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />


                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={

                        <ProtectedRoute>

                            <DashboardLayout>

                                <Dashboard />

                            </DashboardLayout>

                        </ProtectedRoute>

                    }
                />


                {/* History */}

                <Route
                    path="/history"
                    element={

                        <ProtectedRoute>

                            <DashboardLayout>

                                <History />

                            </DashboardLayout>

                        </ProtectedRoute>

                    }
                />


                {/* Favorites */}

                <Route
                    path="/favorites"
                    element={

                        <ProtectedRoute>

                            <DashboardLayout>

                                <Favorites />

                            </DashboardLayout>

                        </ProtectedRoute>

                    }
                />


            </Routes>

        </BrowserRouter>

    );

}


export default App;