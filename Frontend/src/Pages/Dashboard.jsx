import React, { useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { CounterContext } from "../Context/Context";
import { useState } from "react";
import axios from "axios";

function Dashboard() {
  

  const [AllEmployee, setAllEmployee] = useState([])

   const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllEmployee`
      );
      if (res?.data?.data) {
        setAllEmployee(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{

    fetchEmployees()

  }, [])

  console.log(AllEmployee)



  return (
    <div className="w-full md:w-[82vw] flex-col min-h-screen flex px-4 md:px-5 gap-9">
      <Navbar />

      <div className="flex flex-col gap-2 w-full">
        <h1 className="font-bold text-2xl md:text-4xl text-left">
          CRM Admin Dashboard
        </h1>
        <p className="text-sm md:text-base text-left opacity-80">
          Total number of Subadmins in CRM.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
       
        <div className="border border-gray-300 shadow-md rounded-lg p-6 flex flex-col justify-between">
          <div className="flex flex-col items-start text-left gap-2">
            <h1 className="font-bold text-2xl md:text-3xl">Leads</h1>
            <p className="text-sm md:text-base opacity-80">
              Total number of leads in CRM.
            </p>
          </div>
          <div className="flex flex-col items-start  text-left gap-2">
            <h1 className="font-bold text-2xl md:text-3xl">25</h1>
          </div>
        </div>

        <div className="border border-gray-300 shadow-md rounded-lg p-6 gap-7 flex flex-col justify-between">
          <div className="flex flex-col items-start text-left gap-2">
            <h1 className="font-bold text-2xl md:text-3xl">Employees</h1>
            <p className="text-sm md:text-base opacity-80">
              Total number of employees in CRM.
            </p>
          </div>
          <div className="flex flex-col items-start  text-left gap-2">
            <h1 className="font-bold text-2xl md:text-3xl">{AllEmployee.length <=0  ? "0" : AllEmployee.length  }</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
