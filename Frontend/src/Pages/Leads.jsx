import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Plus, ChevronDown, Trash, Pencil } from "lucide-react";
import axios from "axios";

import AddLeadModal from "../Components/AddLeadModal";
import { CounterContext } from "../Context/Context";
import EditLead from "../Components/EditLead";
import DeleteLead from "../Components/DeleteLead";

function Leads() {
  const [Leads, setLeads] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [IsEditOpen, setIsEditOpen] = useState(false);
  

  const { selectedId, setEmployee , Employee, setSelectedId } = useContext(CounterContext);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllLeads`
      );
      if (res?.data?.data) {
        setLeads(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [isModalOpen, IsEditOpen, isOpen ]);

  const handleEdit = (id) => {
    setSelectedId(id);
    setIsEditOpen(true);
  };

   const handleDelete = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  // Dummy data

  return (
    <div className="w-full md:w-[82vw] flex-col min-h-screen flex px-4 md:px-5 gap-9">
      <Navbar />

      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-2 w-full items-start md:items-center">
          <h1 className="font-bold text-xl md:text-4xl text-left">
            Employee list
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center bg-red-500 py-2 px-5 rounded-lg text-white items-center gap-2 hover:bg-red-600 transition"
          >
            <Plus className="w-5 h-5" /> Add employee
          </button>
        </div>

        {/* Table Container */}
        <div className="w-full h-auto md:h-[70vh] p-5 shadow-lg rounded-lg border border-black overflow-x-auto">
          {/* Desktop Table */}
          {/* Desktop Table */}
          <div className="hidden md:block w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-red-50 font-semibold text-gray-700 text-sm md:text-base">
                  <th className="p-3">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3 text-left">Ser No</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Tag</th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Employee</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Leads.map((emp, idx) => (
                  <tr
                    key={emp.id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{emp.companyName}</td>
                    <td className="p-3 break-words">{emp.email}</td>
                    <td className="p-3">{emp.phone}</td>
                    <td className="p-3">{emp.Tag}</td>
                    <td className="p-3">
                      <img
                        src={emp.image}
                        alt="emp"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-3">{emp.status}</td>
                    <td className="p-3">{emp?.Employee?.companyName}</td>
                    <td className="p-3 flex gap-2 items-center">
                      <Pencil
                        onClick={() => handleEdit(emp._id)}
                        className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                      />
                      <Trash
                       onClick={() => handleDelete(emp._id)}
                        className="w-5 h-5 cursor-pointer hover:text-red-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {Leads.map((emp, idx) => (
              <div
                key={emp.id}
                className="border p-4 rounded-lg shadow-sm space-y-2"
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <p className="font-semibold">Ser No:</p>
                  <p>{idx + 1}</p>
                </div>
                <p>
                  <span className="font-semibold">Company:</span> {emp.company}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {emp.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {emp.phone}
                </p>
                <p>
                  <span className="font-semibold">Tag:</span> {emp.tag}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {emp.status}
                </p>
                <p>
                  <span className="font-semibold">Employee:</span>{" "}
                  {emp.employee}
                </p>
                <div className="flex gap-2">
                  <Pencil
                    onClick={() => handleEdit(emp._id)}
                    className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                  />
                  <Trash
                  onClick={() => handleDelete(emp._id)} className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <EditLead isOpen={IsEditOpen} onClose={() => setIsEditOpen(false)} />

        <DeleteLead
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                selectedId={selectedId}
                onDeleteSuccess={(id) => {
                  // Remove employee immediately from state
                  setEmployee((prev) => prev.filter((emp) => emp._id !== id));
                  setSelectedId(null); // reset selectedId
                }}
              />
    </div>
  );
}

export default Leads;
