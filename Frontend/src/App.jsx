import React from "react";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import Leads from "./Pages/Leads";
import Employee from "./Pages/Employee";
import Logout from "./Pages/Logout";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";


// Layout for dashboard routes (with sidebar)
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Leads />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Employee />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Logout />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
