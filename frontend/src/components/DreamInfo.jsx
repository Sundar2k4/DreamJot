import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";

const DreamInfo = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const token = localStorage.getItem("token");
  const [dream, setDream] = useState(null);

  console.log(id);

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
