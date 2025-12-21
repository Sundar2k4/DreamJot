import React, { useEffect, useState } from "react";
import Nav from "./Nav";

const PublicDreams = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/getpub", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white p-6 flex items-center justify-center">
          <div className="text-white/70 text-xl">Loading public dreams...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow">
            Dreams
          </h2>

          {data.length !== 0 ? (
            <div className="p-8">
              <ul className="space-y-4">
                {data.map((dream) => (
                  <li
                    key={dream._id}
                    className="p-6 bg-white/20 rounded-xl border hover:bg-white/30 transition-all hover:scale-[1.02] shadow-lg border-white cursor-pointer"
                  >
                    <div className="flex justify-between items-center text-white font-semibold text-lg mb-2">
                      <span>{new Date(dream.date).toLocaleDateString()}</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {dream.type}
                      </span>
                    </div>
                    <div className="text-white/90 mb-2">
                      <span className="font-semibold">Title:</span> {dream.name}
                    </div>
                    <div className="text-white/90 mb-4">
                      <span className="font-semibold">Dream:</span>{" "}
                      {dream.dream}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="font-semibold text-white/90">
                        Characters:
                      </span>
                      {dream.characters.map((char, index) => (
                        <span
                          key={index}
                          className="bg-white/20 px-3 py-1 rounded-full text-sm text-white"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                    {dream.scenario && (
                      <div className="text-white/80 italic text-sm">
                        "{dream.scenario}"
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/70 text-xl">
                No public dreams yet. Be the first to share!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicDreams;
