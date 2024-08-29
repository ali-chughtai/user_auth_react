import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/users/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
        <label>Enter email:</label>
        <input
          type="email"
          placeholder="johnDoe@gmail.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
