import Employee from "../Models/employee.js";

// ADD NEW EMPLOYEE

 export const addEmployee = async (req, res) => {
  const { companyName, email, phone, position, status, noOfLead } = req.body;

  if (!companyName || !email || !phone || !position || !status || !noOfLead) {
    return res.status(400).json({ message: "All filds are Required" });
  }

  try {
    const employee = await new Employee({
      companyName,
      email,
      phone,
      position,
      status,
      noOfLead,
    });

    await employee.save();

    res.status(200).json({ message: "Employee created Sucessfully" });
  } catch (error) {
    return res.status("400").json({ message: error });
  }
};

  // GET ALL EMPLOYEE
export const getAllEmployee = async (req, res)=>{
  
  try {

    const data = await Employee.find().sort({createdAt: -1})

    res.status(200).json({message: "All user fatched", data: data})
    
  } catch (error) {

    return res.status("400").json({ message: error });
    
  }
}


  // GET ALL EMPLOYEE BY ID 
export const getEmployeeById = async (req, res)=>{
  
  try {

    const { id } = req.params;

    const data = await Employee.findById(id)
    res.status(200).json({message: " user is  fatched", data: data})
    
  } catch (error) {

    return res.status("400").json({ message: error });
    
  }
}


//UPDATE EMPLOYEE BY ID 

export const updateEmployeeById = async (req, res) =>{

   try {
    const { id } = req.params;
    const data = req.body;

    const updateEmployee = await Employee.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee not Found" });
    }
    return res.status(200).json({
      status: true,
      message: "Employee updated successfully",
      updatedLead: updateEmployee,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }

  
}

//DELTE EMPLOYEE BY ID 

export const deleteEmployeeById = async (req, res) =>{

   try {
    const { id } = req.params;
    

    const deleteEmployee = await Employee.findByIdAndDelete(id)
    if (!deleteEmployee) {
      return res.status(404).json({ message: "Employee not Found" });
    }
    return res.status(200).json({
      status: true,
      message: "Employee Deleted successfully",
      updatedLead: deleteEmployee,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }

  
}
