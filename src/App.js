import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import AddPosts from './components/AddPosts'
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<><Navbar /><AddPosts /></>} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    )
}

export default App