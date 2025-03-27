import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ State for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start Loading

    try {
      const response = await fetch("http://localhost:4000/create/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (data.success) {
        setTimeout(() => {  // ✅ Delay before navigating
          alert(data.message || "Login successful!");
          setLoading(false); // Stop Loading
          navigate("/allapi");
        }, 2000); // 2 seconds delay
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false); // Stop Loading
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
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
