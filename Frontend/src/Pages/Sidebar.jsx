import React, { useState } from "react";
import { LayoutDashboard, Phone, IdCard, LogOut, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoutModal from "./Logout"; // ✅ import modal

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); // ✅ modal toggle

  const handleLinkClick = () => {
    setIsOpen(false); // route change ke baad sidebar close
  };

  return (
    <>
      <div className="flex flex-col mt-5 md:mt-0 md:flex">
        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 h-full bg-white shadow-md border-r border-gray-300 
          transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 w-64 md:w-[18vw] flex justify-center items-start z-50`}
        >
          <div className="w-[80%] flex flex-col gap-16 justify-center mt-10 items-start">
            {/* Connect CRM Button */}
            <div className="w-full flex justify-center items-center">
              <button className="bg-red-500 text-white py-3 px-6 rounded-lg w-full md:w-auto">
                Connect CRM
              </button>
            </div>

            {/* Nav Links */}
            <div className="w-full flex flex-col gap-8">
              <NavLink
                to="/home"
                end
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? "flex text-lg md:text-xl text-red-700 cursor-pointer gap-5"
                    : "flex text-lg md:text-xl cursor-pointer gap-5"
                }
              >
                <LayoutDashboard /> Dashboard
              </NavLink>

              <NavLink
                to="/leads"
                end
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? "flex text-lg md:text-xl text-red-700 cursor-pointer gap-5"
                    : "flex text-lg md:text-xl cursor-pointer gap-5"
                }
              >
                <Phone /> Leads
              </NavLink>

              <NavLink
                to="/employee"
                end
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? "flex text-lg md:text-xl text-red-700 cursor-pointer gap-5"
                    : "flex text-lg md:text-xl cursor-pointer gap-5"
                }
              >
                <IdCard /> Employee
              </NavLink>

              {/* ✅ Logout button without NavLink */}
              <button
                onClick={() => {
                  setIsLogoutOpen(true);
                  setIsOpen(false);
                }}
                className="flex text-lg md:text-xl cursor-pointer gap-5 text-left"
              >
                <LogOut /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Logout Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </>
  );
}

export default Sidebar;
