//Controller → Receives the request and sends the response.

import { registerUser, loginUser,refreshAccessToken,logoutUser} from "../services/auth.service.js";

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
    const tokens = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      // data: { token },
      //data: { accessToken, refreshToken },
    //data:{... tokens}  When you want to add or overwrite properties.
      data: tokens,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const accessToken = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


export const logout = async (req, res) => {
    try {

        const { refreshToken } = req.body;

        await logoutUser(refreshToken);

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {

        res.status(400).json({
            success:false,
            message:error.message
        });

    }
};