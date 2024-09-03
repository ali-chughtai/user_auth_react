import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Helper function to check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;  // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/users/dashboard", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setUser(result.user);

          // Set a timeout for token expiration
          const decodedToken = jwtDecode(token);
          const expirationTime = decodedToken.exp * 1000 - Date.now(); // Expiration time in ms

          setTimeout(() => {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
          }, expirationTime);

        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome {user ? user.name : "User"}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserDashboard;
