import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddPosts from "./components/AddPosts";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Sidebar />
              <AddPosts />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
