import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the token from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email'); // Get the email from the query string
  
  async function handleSubmit(e) {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/users/resetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }), // Include email in the request
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message); // Show success message
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Navigate to login after 3 seconds
      } else {
        setMessage(data.message); // Show error message
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          placeholder="********"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
