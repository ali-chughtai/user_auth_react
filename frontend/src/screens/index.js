import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function LandingPage () {
    const navigate = new useNavigate();
    const start = async(e) => {
        e.preventDefault();
        navigate('/signup');
    }

    const handleLogin = async(e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        if(!token){
            navigate('/login');
        }
        else{
            navigate('/dashboard')
        }
    }
    return(
        <div>
            <h1>Landing Page</h1>
            <button onClick={start} >Get Started</button>
            <button onClick={handleLogin} >Login</button>
        </div>
    );
}

export default LandingPage;