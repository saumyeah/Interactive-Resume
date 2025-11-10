import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "intern@demo.com" && password === "pass1234") {
      localStorage.setItem("authToken", "dummy_token");
      navigate("/resume");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page-bg">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
