import React from "react";
import Register from "./pages/register";
import Login from "./pages/login";
// import HomePage from "./pages/Home";
// import VideoPage from "pages/VideoPage";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
// import {Provider} from "react-redux";
// import {store} from "src/store/store";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Login
                                email={""}
                                password={""}
                                helperText={""}
                                isError={false}
                                loggedIn={false}
                            />
                        }
                    />
                    <Route path="/register" element={<Register />} />

                    {true ? <Route path="/home" element={<HomePage />} /> : <Navigate to="/" />}

                    {true ? (
                            <Route path="/video/:key" element={<VideoPage />} />
                        ) : (
                            <Navigate to="/" />
                        )}
                </Routes>
            </Router>
        );
    }
}

export default App;
