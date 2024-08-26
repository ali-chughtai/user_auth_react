import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = new useState("");
  const [password, setPassword] = new useState("");

  const navigate = new useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        email,
        password,
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch("http://localhost:3000/users/login", requestOptions);
      const result = await response.json();
      if (result.message === "Success") {
        navigate("/dashboard", { state: { user: result.user } });
      } 
      else if(response.status === 404){
        alert("User Not Fount");
        setEmail('');
        setPassword('');
      }
      else if(response.status === 401){
        alert("Email or password incorrect");
        setEmail('');
        setPassword('');
      }
      else {
        console.log(result.message); 
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "space-evenly",
        gap: "1rem",
      }}
    >
      <div>
        <h1>Login Page</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} style={{ margin: "0" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="Submit">Login</button>
        </form>
      </div>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default Login;
