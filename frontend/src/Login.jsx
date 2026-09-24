import { useState } from "react";
import { API } from "./config";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = isRegister ? "/api/auth/register" : "/api/auth/login";
    const res = await fetch(API + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }
    localStorage.setItem("user", JSON.stringify(data)); // remember the user after refresh
    onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-5" style={{ maxWidth: 380 }}>
      <h4>{isRegister ? "Create account" : "Login"} to RecallDev</h4>
      {isRegister && (

        <input className="form-control mb-2" placeholder="Name" value={name}
               onChange={(e) => setName(e.target.value)} required />
      )}
      <input className="form-control mb-2" type="email" placeholder="Email" value={email}
             onChange={(e) => setEmail(e.target.value)} required />
      <input className="form-control mb-2" type="password" placeholder="Password" value={password}
             onChange={(e) => setPassword(e.target.value)} required />
      {error && <div className="alert alert-danger py-1">{error}</div>}
      <button className="btn btn-primary w-100">{isRegister ? "Register" : "Login"}</button>
      <button type="button" className="btn btn-link" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New here? Register"}
      </button>
    </form>
  );
}