import express from "express"
import {addEmployee , getAllEmployee, updateEmployeeById, deleteEmployeeById, getEmployeeById} from "../Controlers/employeeController.js"


const router = express.Router()

// Employee Route 
router.post("/addEmployee", addEmployee )
router.get("/getAllEmployee", getAllEmployee )
router.put("/updateEmployeById/:id", updateEmployeeById )
router.delete("/deleteEmployeById/:id", deleteEmployeeById )
router.get("/getEmployeeById/:id", getEmployeeById )




export default router







