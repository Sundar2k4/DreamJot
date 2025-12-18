import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const DreamForm = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [type, setType] = useState("");
  const [characters, setCharacters] = useState("");
  const [dream, setDream] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();

    const charactersarr = characters.split(",").map((c) => c.trim());
    const data = { date, type, characters: charactersarr, dream };
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/adddream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      })
      .then((result) => console.log("Success:", result))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="">
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white flex justify-center items-center p-6">
        <form
          onSubmit={handlesubmit}
          className="w-full max-w-lg bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow">
            Add Your Dream ✨
          </h2>

          <label className="text-white font-semibold">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full mt-1 mb-4 p-3 rounded-lg bg-white/20 text-white border border-white/30 
          focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30"
          />

          <label className="text-white font-semibold">Dream Description</label>
          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            required
            rows="4"
            className="w-full mt-1 mb-4 p-3 rounded-lg bg-white/20 text-white border border-white/30 
          focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30"
          />

          <label className="text-white font-semibold">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full mt-1 mb-4 p-3 rounded-lg bg-white/20 text-white border border-white/30 
          focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30"
          />

          <label className="text-white font-semibold">
            Characters (comma separated)
          </label>
          <input
            type="text"
            value={characters}
            onChange={(e) => setCharacters(e.target.value)}
            required
            className="w-full mt-1 mb-4 p-3 rounded-lg bg-white/20 text-white border border-white/30 
          focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30"
          />

          <button
            type="submit"
            className="w-full mt-4 bg-white text-black font-bold py-3 rounded-lg 
          hover:bg-gray-200 hover:scale-[1.02] transition-all shadow-lg cursor-pointer"
          >
            Submit Dream
          </button>
        </form>
      </div>
    </div>
  );
};

export default DreamForm;
