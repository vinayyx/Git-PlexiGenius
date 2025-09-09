import React from "react";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import Leads from "./Pages/Leads";
import Employee from "./Pages/Employee";
import Logout from "./Pages/Logout";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/leads" element={<Leads />} />
         <Route path="/employee" element={<Employee />} />
         <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
