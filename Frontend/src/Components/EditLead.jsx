import React, { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { CounterContext } from "../Context/Context";
import toast from "react-hot-toast";

function EditLead({ isOpen, onClose }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    image: null,
    tag: "",
    status: "",
    employee: "",
  });

  const { selectedId } = useContext(CounterContext);

  // 🔹 Fetch employees for dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getAllEmployee`
        );
        setEmployees(res.data.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  // 🔹 Fetch lead details when editing
  useEffect(() => {
    const fetchLead = async () => {
      if (selectedId && isOpen) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/getLeadsById/${selectedId}`
          );
          const lead = res.data.data;

          setForm({
            companyName: lead.companyName || "",
            email: lead.email || "",
            phone: lead.phone || "",
            image: null, // keep null, don’t prefill file input
            tag: lead.Tag || "",
            status: lead.status || "",
            employee: lead.Employee || "",
          });
        } catch (error) {
          console.error("Error fetching lead:", error);
        }
      }
    };

    fetchLead();
  }, [selectedId, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🔹 Update Lead
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

      console.log(formData);

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateLeadsById/${selectedId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Lead updated");

      onClose(); // close modal after success
    } catch (error) {
      console.error("Error updating lead:", error);
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

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {selectedId ? "Edit Lead" : "Add Lead"}
        </h2>

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
            {selectedId ? "Update Lead" : "Add Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditLead;
