import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { useSelector } from "react-redux";
const App = () => {
    const currentUser = useSelector((state) => state.user.authData);
    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Navigate to="/posts" />} />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route
                        path="/auth"
                        exact
                        element={
                            !currentUser ? <Auth /> : <Navigate to="/posts" />
                        }
                    />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
