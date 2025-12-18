import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const token = localStorage.getItem("token");
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
  const navigate = useNavigate();
  return (
    <nav className="bg-gradient-to-r from-black via-gray-800 to-white shadow-lg px-8 py-4">
      <div className="flex items-center justify-between">
        <h1
          className="text-white text-3xl font-bold tracking-wide drop-shadow hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
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
              AddDream
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-md"
                    : "hover:bg-white hover:text-black"
                }`
              }
            >
              About
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
            onClick={() => {
              handleAuthClick;
            }}
          >
            {label}
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
