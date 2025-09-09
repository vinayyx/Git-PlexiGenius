import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

function AddEmployeeModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    company: "",
    email: "",
    phone: "",
    position: "",
    status: "",
    leads: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addEmployee`,
        {
          companyName: form.company,
          email: form.email,
          phone: form.phone,
          position: form.position,
          status: form.status,
          noOfLead: form.leads,
        }
      );

      if (!data) {
        return console.log("required filed missing");

      }

      

      setForm({
        company: "",
        email: "",
        phone: "",
        position: "",
        status: "",
        leads: "",
      });

      onClose()

      console.log("employ created successfully");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[95%] md:w-[55%] p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Employee</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company */}
          <div>
            <label className="block text-sm font-semibold mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-red-500"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone"
                className="w-full border rounded-lg px-3 py-2 focus:outline-red-500"
              />
            </div>
          </div>

          {/* Position & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Enter position"
                className="w-full border rounded-lg px-3 py-2 focus:outline-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <input
                type="text"
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="Enter status"
                className="w-full border rounded-lg px-3 py-2 focus:outline-red-500"
              />
            </div>
          </div>

          {/* No. of Leads */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              No. of Leads
            </label>
            <input
              type="number"
              name="leads"
              value={form.leads}
              onChange={handleChange}
              placeholder="Enter no. of leads"
              className="w-full border rounded-lg px-3 py-2 focus:outline-red-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
