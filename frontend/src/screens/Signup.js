import React, { useState } from 'react';
import '../styles/Signup.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handlePress = async (e) => {
        e.preventDefault();
        try {
            const raw = {
                name,
                email,
                password // You can include more properties here if needed
            };

            const response = await fetch("http://localhost:3000/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(raw),
            });



            const result = await response.text();
            console.log(result);

            if (response.ok) {
                setName("");
                setPassword("");
                setEmail("");

                navigate('/dashboard', { state: { user: raw } });
            }
        } catch (err) {
            console.error("Error during registration:", err);
        }
    };


    return (
        <div className='mainDiv'>
            <h1>Sign up screen</h1>
            <form onSubmit={handlePress}>
                <label>Name</label>
                <input 
                    type='text' 
                    placeholder='eg: JohnDoe' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
                <label>Email</label>
                <input 
                    type='email' 
                    placeholder='eg: johndoe@gmail.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <label>Password</label>
                <input 
                    type='password' 
                    placeholder='*******' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type='submit'>Register</button>
            </form>
            <h6>already have an account? <span style={{userSelect:'none' , textDecoration:'underline' ,  color:'purple' , fontStyle:'italic'}} onClick={() => navigate('/login')} > Sign in</span></h6>

        </div>
    );
}

export default SignUp;