import express from "express";
import { signup, login, refreshToken, logout } from "../Controlers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshToken); // client calls this to get new access token; refresh token stored in cookie
router.post("/logout", logout);

export default router;
