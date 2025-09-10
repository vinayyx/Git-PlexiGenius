import express, { json } from "express";
import cors from "cors";
import { ConnectDb } from "./Config/db.js";
import employee from "./Routes/employeeRoutes.js"
import { configDotenv } from "dotenv";
import leads from "./Routes/LeadsRoutes.js"
import authRoutes from "./Routes/authRoutes.js";
import { requireAuth } from "./Middleware/requireAuth.js";
import cookieParser from "cookie-parser";


const app = express();

// MIDDLEWARES
import cors from "cors";

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // ✅ sirf apna frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // agar cookie / JWT bhejni hai
  })
);
app.use(express.json());
ConnectDb();
configDotenv()
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Server is ruuning");
});



app.use("/api/auth", authRoutes);

//Employe Routes
app.use("/api", employee)
app.use("/api", leads)

app.listen(5000, () => {
  console.log("Server is running");
});
