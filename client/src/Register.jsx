import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"
import { Container } from "@mui/material";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  //As we Press the Submit button the Page refreshes 
  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch ("http://localhost:3001/api/register" , {

    method: 'POST' ,
    //I am sending the Body as an App/json so Headers
    headers: {
        'Content-Type' : 'application/json'
    } ,
    //Body is passed as following obj We send this to backedn
        body: JSON.stringify({
            name,email,password,
        }),
    })

    const data= await response.json();
    console.log(data);

    if(data.status === 'ok') {
      navigate("/login")
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
