import Leads from "../Models/Lead.js";

//CREATE NEW LEADS

export const addNewLeads = async (req, res) => {
  const { companyName, phone ,  email, Tag, status, Employee } = req.body;

  const imageUrl = req.file?.path;

  try {
    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // New Lead create
    const lead = new Leads({
      companyName,
      email,
      Tag,
      status,
      Employee,
      phone,
      image: imageUrl,
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL Leads
export const getAllLeads = async (req, res) => {
  try {
    const data = await Leads.find().sort({ createdAt: -1 }).populate("Employee", "companyName");

    console.log(data)

    res.status(200).json({ message: "All Leads fatched", data: data });
  } catch (error) {
    return res.status("400").json({ message: error });
  }
};

// GET ALL Leads BY ID
export const getLeadsById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Leads.findById(id);
    res.status(200).json({ message: " user is  fatched", data: data });
  } catch (error) {
    return res.status("400").json({ message: error });
  }
};

//UPDATE Leads BY ID

export const updateLeadsById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updateLeads = await Leads.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updateLeads) {
      return res.status(404).json({ message: "Employee not Found" });
    }
    return res.status(200).json({
      status: true,
      message: "Leads updated successfully",
      updatedLead: updateLeads,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

//DELTE Leads BY ID

export const deleteLeadsById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteLeads = await Leads.findByIdAndDelete(id);
    if (!deleteLeads) {
      return res.status(404).json({ message: "Leads not Found" });
    }
    return res.status(200).json({
      status: true,
      message: "Leads Deleted successfully",
      updatedLead: deleteLeads,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};
