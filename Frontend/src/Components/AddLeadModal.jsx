import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

function AddLeadModal({ isOpen, onClose }) {
  const [employees, setEmployees] = useState([]); // employee list

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getAllEmployee`
        ); // yaha teri getAllEmployees API ka URL
        setEmployees(res.data.data); // maan le API response: { data: [ { _id, companyName, email } ] }
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    image: null,
    tag: "",
    status: "",
    employee: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("companyName", form.companyName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("Tag", form.tag);
      formData.append("status", form.status);
      formData.append("Employee", form.employee);
      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addnewLead`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Lead created:", res.data);

      setForm({
        companyName: "",
        email: "",
        phone: "",
        image: null,
        tag: "",
        status: "",
        employee: "",
      });

      onClose();
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

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Lead</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company */}
          <div>
            <label className="block text-sm font-semibold mb-1">Company</label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
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

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-red-500"
              accept="image/*"
            />
          </div>

          {/* Tag & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Tag</label>
              <input
                type="text"
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="Enter tag"
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

          {/* Employee */}
          <div>
            <label className="block text-sm font-semibold mb-1">Employee</label>
            <select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-red-500"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
          >
            Add Lead
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLeadModal;
