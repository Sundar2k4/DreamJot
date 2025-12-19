import React, { useState, useEffect } from "react";
import Nav from "./Nav";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    fetch("http://localhost:5000/finddreams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow">
            Your Dreams
          </h2>

          {data.length !== 0 ? (
            <div className="p-8">
              <ul className="space-y-4">
                {data.map((dream) => (
                  <li
                    key={dream._id}
                    className="p-6 bg-white/20 rounded-xl border hover:bg-white/30 transition-all hover:scale-[1.02] shadow-lg border-white"
                  >
                    <div className="text-white font-semibold text-lg mb-2">
                      {new Date(dream.date).toLocaleDateString()}
                    </div>
                    <div className="text-white/90 mb-2">
                      <span className="font-semibold">Dream:</span>{" "}
                      {dream.dream}
                    </div>
                    <div className="text-white/90 mb-2">
                      <span className="font-semibold">Type:</span> {dream.type}
                    </div>
                    <div className="text-white/90">
                      <span className="font-semibold">Characters:</span>
                      {Array.isArray(dream.characters)
                        ? dream.characters.join(", ")
                        : dream.characters}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/70 text-xl">
                No dreams found. Create your first dream!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
