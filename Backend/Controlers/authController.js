import bcrypt from "bcrypt";
import User from "../Models/User.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const SALT_ROUNDS = 10;

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password required." });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "User already exists with this email." });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ name, email, password: hashed });
    await user.save();

    return res.status(201).json({ message: "User created", data: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("signup err:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials." });

    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id });

    // Save refresh token in DB (single-session). For multi-device, store array.
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days (match REFRESH_TOKEN_EXPIRES)
    });

    return res.json({ accessToken, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    console.error("login err:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Refresh token endpoint
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided." });

    // Verify refresh token signature & expiry
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (e) {
      return res.status(401).json({ message: "Invalid refresh token." });
    }

    const user = await User.findById(payload.id);
    if (!user || !user.refreshToken) return res.status(401).json({ message: "Invalid session." });
    if (user.refreshToken !== token) return res.status(401).json({ message: "Refresh token mismatch." });

    // issue new access token (and optionally new refresh token)
    const newAccessToken = signAccessToken({ id: user._id, role: user.role });

    // OPTIONAL: rotate refresh token — recommended. We'll rotate:
    const newRefreshToken = signRefreshToken({ id: user._id });
    user.refreshToken = newRefreshToken;
    await user.save();

    // Set new cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("refresh err:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      try {
        const payload = verifyRefreshToken(token);
        const user = await User.findById(payload.id);
        if (user) {
          user.refreshToken = "";
          await user.save();
        }
      } catch (e) {
        // silent
      }
    }

    res.clearCookie("token", {
  httpOnly: true,
  sameSite: "None",  // cross-site ke liye important
  secure: true,      // local pe false, production (https) pe true
});

    // clear cookie
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("logout err:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
