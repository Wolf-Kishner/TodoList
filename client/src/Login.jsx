import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //As we Press the Submit button the Page refreshes
  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      //I am sending the Body as an App/json so Headers
      headers: {
        "Content-Type": "application/json",
      },
      //Body is passed as following obj We send this to backedn
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      alert("Login Successful");
      navigate("/todos")
      
    } else {
      alert("Please Check Credentials");
    }

  }

  return (
    <div>
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <input type="submit" value="Login" />
      </form>
      </div>
    </div>
  );
}

export default Login;
