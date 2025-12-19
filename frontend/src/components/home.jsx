import React, { useState, useEffect } from "react";
import Nav from "./Nav";

const Home = () => {
  const [data, setData] = useState([]);

  const handledelete = async (id) => {
    const token = localStorage.getItem("token");
    const del = await fetch("http://localhost:5000/deletedream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (del.ok) {
      console.log("deleted successfully");
      setData((prev) => prev.filter((d) => d._id !== id));
    } else {
      alert("an error occured");
    }
  };

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
                      <div
                        className="flex justify-end hover:cursor-pointer"
                        onClick={() => handledelete(dream._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="red"
                          class="size-5 hover:bg-black rounded-xl"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
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
