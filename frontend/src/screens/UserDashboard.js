import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/users/dashboard", {
          method: "GET",
          headers: {
            "Authorization": token,
          },
        });

        const result = await response.json();
        alert( JSON.stringify(result.user) )
        if (response.ok) {
          setUser(result.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome {user ? user.email : 'User'}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserDashboard;
