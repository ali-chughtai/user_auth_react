import React from 'react';
import { useLocation } from 'react-router-dom';

function UserDashboard() {
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div>
            <h1>Welcome {user ? user.name : 'User'}</h1>
            <p>Email: {user ? user.email : 'Not provided'}</p>
            <p>Password: {user ? user.password : 'Not provided'}</p> {/* You might want to hide or avoid displaying passwords */}
        </div>
    );
}

export default UserDashboard;
