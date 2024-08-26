import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function LandingPage () {
    const navigate = new useNavigate();
    const start = async(e) => {
        e.preventDefault();
        navigate('/signup');
    }
    return(
        <div>
            <h1>Landing Page</h1>
            <button onClick={start} >Get Started</button>
        </div>
    );
}

export default LandingPage;