import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBarChart2,
  FiUser,
  FiMenu,
  FiX,
  FiMap,
} from "react-icons/fi";

const Sidebar = ({ isMobile }) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Contact", icon: <FiUser />, to: "/" },
    { title: "Chart and Map", icon: <FiBarChart2 />, to: "/chartmap" },
  ];

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      {!isMobile ? (
        <div className="flex">
          <div
            className={`${
              open ? "w-72" : "w-20"
            } bg-blue-600 h-screen p-6 pt-8 relative duration-300`}
          >
            <div
              className={`absolute cursor-pointer -right-3 top-9 w-10 h-10 flex items-center justify-center bg-white rounded-full border-2 border-blue-600 ${
                !open && "rotate-180"
              }`}
              onClick={toggleSidebar}
            >
              {open ? (
                <FiX className="text-blue-600" />
              ) : (
                <FiMenu className="text-blue-600" />
              )}
            </div>
            <ul className="pt-3">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`flex p-1 cursor-pointer hover:bg-light-white text-gray-300 text-l items-center gap-x-4 mt-4`}
                >
                  <Link to={Menu.to} className="flex items-center">
                    {Menu.icon}
                    <span className={`${!open && "hidden"} ml-2`}>
                      {Menu.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-blue-600 p-4 flex justify-start">
          <Link to="/" className="text-white p-2 hover:bg-blue-700">
            <FiUser className="mr-2 text-xl" />
            Contact
          </Link>
          <Link to="/chartmap" className="text-white p-2 hover:bg-blue-700">
            <FiMap className="mr-2 text-xl" />
            Chart and Map
          </Link>
        </div>
      )}
    </>
  );
};

export default Sidebar;
