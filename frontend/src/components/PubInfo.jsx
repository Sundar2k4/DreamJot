import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";

const PubInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dream, setDream] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id || !token) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/getpubinfo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDream(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white flex items-center justify-center">
        <div className="text-white/70 text-xl">Loading dream details...</div>
      </div>
    );
  }

  if (!dream) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white flex items-center justify-center">
        <div className="text-white/70 text-xl">Dream not found</div>
      </div>
    );
  }

  return (
    <div className="">
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white p-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
          Dream Details
        </h2>
        <div className="max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dreams
          </button>

          <div className="p-8 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl">
            <div className="text-white/90 mb-6 p-4 bg-white/10 rounded-xl">
              <span className="font-semibold text-lg">👤 Name:</span>
              <h3 className="text-2xl font-bold text-white ml-2">
                {dream.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-white/10 rounded-xl">
                <span className="font-semibold text-white/90 block mb-1">
                  📅 Date:
                </span>
                <span className="text-xl text-white font-medium">
                  {new Date(dream.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="p-4 bg-white/10 rounded-xl">
                <span className="font-semibold text-white/90 block mb-1">
                  🏷️ Type:
                </span>
                <span className="text-xl text-white font-medium px-4 py-2 bg-white/20 rounded-full inline-block">
                  {dream.type}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <span className="font-semibold text-white/90 text-lg block mb-4">
                💭 Dream:
              </span>
              <div className="p-6 bg-white/10 rounded-xl border border-white/20">
                <p className="text-white text-lg leading-relaxed">
                  {dream.dream}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <span className="font-semibold text-white/90 text-lg block mb-4">
                👥 Characters:
              </span>
              <div className="flex flex-wrap gap-3 p-4 bg-white/10 rounded-xl">
                {dream.characters.map((char, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full text-white font-medium border border-white/30"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {dream.scenario && (
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/30">
                <span className="font-semibold text-white/90 text-lg block mb-4">
                  🎭 Scenario:
                </span>
                <p className="text-white/95 text-lg italic font-light leading-relaxed">
                  "{dream.scenario}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PubInfo;
