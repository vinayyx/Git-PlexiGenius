import React from "react";
import { User } from "lucide-react";

function Navbar() {
  return (
    <div className="flex flex-col md:flex-row w-full justify-between mt-7 gap-4 md:gap-5 items-center h-auto md:h-[10vh]">
      {/* Search Bar */}
      <div className="w-full md:w-[70%]">
        <input
          placeholder="Search"
          className="w-full rounded-lg border border-gray-400 py-2 px-3 outline-none"
          type="text"
        />
      </div>

      {/* User Box */}
      <div className="flex gap-2 md:gap-3 border border-gray-400 rounded-lg justify-center items-center px-4 py-2 w-full md:w-auto">
        <h1 className="text-sm md:text-lg font-medium text-center w-full md:w-auto">
          Ansh
        </h1>
        <User className="w-4 h-4 md:w-5 md:h-5" />
      </div>
    </div>
  );
}

export default Navbar;
