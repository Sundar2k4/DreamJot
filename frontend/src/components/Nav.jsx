import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const label = token ? "Logout" : "Register";

  const handleAuthClick = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    } else {
      navigate("/register");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-800 to-white shadow-lg px-8 py-4">
      <div className="flex items-center justify-between">
        <h1
          className="text-white text-3xl font-bold tracking-wide drop-shadow hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          DreamJot
        </h1>

        <ul className="flex space-x-10">
          <li>
            <NavLink
              to="/dream"
              className={({ isActive }) =>
                `text-white text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-black text-black shadow-md"
                    : "hover:bg-white hover:text-black"
                }`
              }
            >
              Post
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pub"
              className={({ isActive }) =>
                `text-black text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-md"
                    : "hover:bg-white hover:text-black"
                }`
              }
            >
              Explore
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-md"
                    : "hover:bg-white hover:text-black"
                }`
              }
            >
              Contact
            </NavLink>
          </li>

          <button
            className="bg-black text-white rounded-xl p-2 hover:cursor-pointer hover:bg-white hover:text-black"
            onClick={handleAuthClick}
          >
            {label}
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
