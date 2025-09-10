import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {}, {
      });

      if (res.status === 200) {
        
        toast.success("Logout successful")

        
        localStorage.removeItem("token");

        
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white flex flex-col justify-center items-center rounded-lg shadow-lg p-5 h-auto min-h-[45vh] w-full max-w-md md:max-w-2xl text-center">
        <h2 className="text-lg md:text-2xl mb-6">
          Are You Sure You Want To Logout?
        </h2>

        <div className="flex flex-col gap-5 justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 w-full md:w-auto md:px-20 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="bg-black w-full md:w-auto text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
