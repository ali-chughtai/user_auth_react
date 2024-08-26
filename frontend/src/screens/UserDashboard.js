import React , {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import '../styles/userDashboard.css'
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const navigate = new useNavigate(); 
    const location = useLocation();
    const user = location.state?.user;

    const logout =  async(e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div>
            <h1>Welcome {user ? user.name : 'User'}</h1>
            <button onClick={logout} >Logout</button>
        </div>
    );
}

export default UserDashboard;
