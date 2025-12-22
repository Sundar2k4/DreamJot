import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const PublicDreams = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const handledelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/delpub/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      setData((prev) => prev.filter((dream) => dream._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

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
        <div className="max-w-4xl mx-auto hover:cursor-pointer">
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow">
            Dreams
          </h2>

          {data.length !== 0 ? (
            <ul className="space-y-4">
              {data.map((dream) => (
                <li
                  key={dream._id}
                  className="p-6 bg-white/20 rounded-xl border hover:bg-white/30 transition-all hover:scale-[1.02] shadow-lg border-white"
                  onClick={() => {
                    navigate(`/pubinfo/${dream._id}`);
                  }}
                >
                  <div className="flex justify-between items-center text-white font-semibold text-lg mb-2">
                    <span>{new Date(dream.date).toLocaleDateString()}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {dream.type}
                    </span>
                  </div>

                  <div
                    className="flex justify-end mb-4"
                    onClick={() => {
                      handledelete(dream._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="red"
                      className="size-6 hover:bg-black rounded-xl cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="text-white/90 mb-2">
                    <span className="font-semibold">Name:</span> {dream.name}
                  </div>

                  <div className="text-white/90 mb-4">
                    <span className="font-semibold">Dream:</span> {dream.dream}
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
