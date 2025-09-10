import express from "express";
import { addNewLeads , getAllLeads , getLeadsById  , updateLeadsById , deleteLeadsById} from "../Controlers/LeadController.js";
import upload from "../Config/multer.js";

const router = express.Router();

router.post("/addnewLead", upload.single("image"), addNewLeads);
router.get("/getAllLeads", getAllLeads )
router.put("/updateLeadsById/:id", upload.single("image"), updateLeadsById )
router.delete("/deleteLeadsById/:id", deleteLeadsById )
router.get("/getLeadsById/:id", getLeadsById )

export default router;
