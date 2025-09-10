import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Plus, ChevronDown, Trash, Pencil } from "lucide-react";
import AddEmployeeModal from "../Components/AddEmployeeModal";
import axios from "axios";
import { CounterContext } from "../Context/Context";
import EditEmployee from "../Components/EditEmployee";
import DeleteConfirmModal from "../Components/DeleteConfirmModal ";
import Spinner from "../Components/Spinner";

function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsEditOpen, setIsEditOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, SetLoading] = useState(false);

  const { selectedId, setEmployee, Employee, setSelectedId } =
    useContext(CounterContext);

  const fetchEmployees = async () => {
    SetLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getAllEmployee`
      );
      if (res?.data?.data) {
        setEmployee(res.data.data);
      }

      SetLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [isOpen, IsEditOpen, isModalOpen]);

  const handleEdit = (id) => {
    setSelectedId(id);
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  return (
    <div className="w-full md:w-[82vw] flex-col min-h-screen flex px-4 md:px-5 gap-9">
      <Navbar />

      

      {Loading ? (
        <div className="w-full h-full flex mt-[15vw] justify-center bg-red items-center" > <Spinner /></div>
        
      ) : (
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-2 w-full items-start md:items-center">
            <h1 className="font-bold text-xl md:text-4xl text-left">
              Employee List
            </h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex justify-center bg-red-500 py-2 px-5 rounded-lg text-white items-center gap-2 hover:bg-red-600 transition"
            >
              <Plus className="w-5 h-5" /> Add Employee
            </button>
          </div>

          {/* Table Container */}
          <div className="w-full h-auto md:h-[70vh] p-5 shadow-lg rounded-lg border border-gray-300 overflow-x-auto">
            {/* Desktop Table */}
            {/* Desktop Table */}
            <div className="hidden md:block w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-red-50 font-semibold text-gray-700 text-sm md:text-base">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Company</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Position</th>
                    <th className="p-3 text-left">No. of Leads</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Employee.map((emp, idx) => (
                    <tr
                      key={emp._id}
                      className="border-b hover:bg-gray-50 text-sm"
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3">{emp.companyName}</td>
                      <td className="p-3 break-words">{emp.email}</td>
                      <td className="p-3">{emp.phone}</td>
                      <td className="p-3">{emp.position}</td>
                      <td className="p-3">{emp.noOfLead}</td>
                      <td className="p-3">{emp.status}</td>
                      <td className="p-3 flex gap-2 text-red-500">
                        <Pencil
                          onClick={() => handleEdit(emp._id)}
                          className="w-5 h-5 cursor-pointer hover:text-red-700"
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
              {Employee.map((emp, idx) => (
                <div
                  key={emp._id}
                  className="border p-4 rounded-lg shadow-sm space-y-2 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <p className="font-semibold">Ser No:</p>
                    <p>{idx + 1}</p>
                  </div>
                  <p>
                    <span className="font-semibold">Company:</span>{" "}
                    {emp.companyName}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {emp.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {emp.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Position:</span>{" "}
                    {emp.position}
                  </p>
                  <p>
                    <span className="font-semibold">No. of Leads:</span>{" "}
                    {emp.noOfLead}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span> {emp.status}
                  </p>
                  <div className="flex gap-3 pt-2">
                    <button className="border text-red-500 border-red-500 flex gap-1 items-center text-sm px-3 py-1 rounded-lg hover:bg-red-100 transition">
                      Action <ChevronDown className="w-4 h-4" />
                    </button>
                    <Pencil
                      onClick={() => handleEdit(emp._id)}
                      className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                    />
                    <Trash
                      onClick={() => handleDelete(emp._id)}
                      className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Edit Employee Modal */}
      <EditEmployee isOpen={IsEditOpen} onClose={() => setIsEditOpen(false)} />

      {/* Delete Employee Modal */}
      <DeleteConfirmModal
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

export default Employee;
