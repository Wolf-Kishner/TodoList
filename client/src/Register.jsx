import React, { useState } from "react"; // Add { useState }
import { useNavigate } from "react-router-dom";
import "./index.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, password, // Simplified object shorthand
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.status === 'ok') {
      navigate("/login");
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="heading">Register</h1>
        <form onSubmit={registerUser}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default Register;
