//Controller → Receives the request and sends the response.

import { registerUser, loginUser} from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { token },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};