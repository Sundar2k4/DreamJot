import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, password };
    fetch("http://localhost:5000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (data.ok) {
      const token = await res.json();
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  return (
    <div className="">
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white flex justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow">
            Login 🔐
          </h2>

          <label className="text-white font-semibold">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 mb-4 p-3 rounded-lg bg-white/20 text-white border border-white/30 
          focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30"
          />

          <label className="text-white font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 mb-4 p-3 rounded-lg bg-white/20 text-white border border-white/30 
          focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30"
          />

          <button
            type="submit"
            className="w-full mt-4 bg-white text-black font-bold py-3 rounded-lg 
          hover:bg-gray-200 hover:scale-[1.02] transition-all shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
