import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // prop handling

const DreamInfo = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  console.log(id);

  const currdream = async () => {
    const res = await fetch("http://localhost:5000/cdream", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      const json = await res.json();
      setData(json);
      console.log("dream fetched successfully");
    }
  };

  return (
    <div>
      <p>dreaminfo</p>

      <button onClick={currdream}>Load dream</button>

      {data.length > 0 && (
        <div>
          <ul>
            {data.map((dream) => (
              <li key={dream._id}>{dream.type}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DreamInfo;
