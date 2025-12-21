import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";

const DreamInfo = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const token = localStorage.getItem("token");
  const [dream, setDream] = useState(null);

  console.log(id);

  const handlepost = async () => {
    if (!dream || !token) {
      console.log("No dream or token available");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dream),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Posted successfully:", result);
        alert("Dream shared successfully!");
      } else {
        console.error("Post failed:", response.status);
        alert("Failed to share dream");
      }
    } catch (error) {
      console.error("Error posting dream:", error);
      alert("Error sharing dream");
    }
  };

  const currdream = async () => {
    const res = await fetch(`http://localhost:5000/cdream/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const json = await res.json();
      setDream(json);
      console.log("dream fetched successfully");
    }
  };

  useEffect(() => {
    if (id) currdream();
  }, [id]);

  return (
    <div className="">
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Dream Details ✨
            </h1>
            <p className="text-white/60 text-lg">
              Explore the details of your dream
            </p>
          </div>

          {!dream ? (
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-12 border border-white/20 text-center">
              <p className="text-white/70 text-xl">Loading dream details...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="inline-block bg-white/20 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/30 shadow-xl">
                  <span className="text-white font-bold text-2xl">
                    {new Date(dream.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/20">
                    <h3 className="text-white font-bold text-xl mb-6 text-center">
                      Dream Info
                    </h3>

                    <div className="flex justify-center mb-6">
                      <button
                        onClick={handlepost}
                        className="w-full max-w-md bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        disabled={!dream || !token}
                      >
                        Post Dream
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 font-semibold mb-2">
                          Type
                        </label>
                        <div className="p-4 bg-white/20 rounded-xl border border-white/30 text-white font-medium text-lg px-6">
                          {dream.type}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/80 font-semibold mb-2">
                          Characters
                        </label>
                        <div className="p-4 bg-white/20 rounded-xl border border-white/30 text-white font-medium text-lg px-6 min-h-[80px]">
                          {Array.isArray(dream.characters)
                            ? dream.characters.join(", ")
                            : dream.characters || "None"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/20">
                    <h3 className="text-white font-bold text-xl mb-6 text-center">
                      Dream Narrative
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 font-semibold mb-2">
                          Description
                        </label>
                        <div className="p-6 bg-white/20 rounded-xl border border-white/30 text-white text-lg leading-relaxed min-h-[120px]">
                          {dream.dream || "No description available"}
                        </div>
                      </div>

                      {dream.scenario && (
                        <div>
                          <label className="block text-white/80 font-semibold mb-2">
                            Scenario
                          </label>
                          <div className="p-6 bg-white/20 rounded-xl border border-white/30 text-white text-lg leading-relaxed min-h-[100px]">
                            {dream.scenario}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DreamInfo;
