import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    console.log("API URL:", import.meta.env.VITE_API); // Debug API URL
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/create/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const text = await response.text(); // Get raw response text
      console.log("Raw Response:", text); // Log it to see if it's JSON or an error page
  
      // Try parsing JSON safely
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        throw new Error("Received non-JSON response. Possible server error.");
      }
  
      console.log("Server Response:", data);
  
      setLoading(false);
  
      if (data.success) {
        alert(data.message || "Login successful!");
        navigate("/allapi");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      alert(error.message);
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button-1" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <p>Don't have an account? <Link to="/register">Create Account</Link></p>
      </form>
    </>
  );
}

export default Login;
