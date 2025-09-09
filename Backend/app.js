import express, { json } from "express";
import cors from "cors";
import { ConnectDb } from "./Config/db.js";
import employee from "./Routes/employeeRoutes.js"
import { configDotenv } from "dotenv";
import leads from "./Routes/LeadsRoutes.js"

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
ConnectDb();
configDotenv()

app.get("/", (req, res) => {
  res.send("Server is ruuning");
});


//Employe Routes

app.use("/api", employee)
app.use("/api", leads)

app.listen(5000, () => {
  console.log("Server is running");
});
