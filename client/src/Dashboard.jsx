import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = React.useState(null);

  async function populateQuote() {
    try {
      const req = await fetch("http://localhost:3001/api/quote", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      if (!req.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await req.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, e.g., redirect to an error page
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateQuote();
      }
    }
  }, []);

  return (
    <div>
      <h1>Hello world</h1>
      {quote && <p>{quote}</p>}
    </div>
  );
};

export default Dashboard;
