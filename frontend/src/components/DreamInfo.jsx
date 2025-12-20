import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // prop handling

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
    currdream();
  }, []);

  return (
    <div>
      <p>dreaminfo</p>
      {dream && (
        <div>
          <p>Type: {dream.type}</p>
          <p>Description: {dream.dream}</p>
          <p>Date: {dream.date}</p>
          <p>characters: {dream.characters}</p>
        </div>
      )}
    </div>
  );
};

export default DreamInfo;
