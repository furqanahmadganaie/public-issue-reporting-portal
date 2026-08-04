//Controller → Receives the request and sends the response.

import { registerUser, loginUser,refreshAccessToken,logoutUser,verifyPhone,resendOTPService,forgotPasswordService,resetPasswordService} from "../services/auth.service.js";



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


export const verifyPhoneNumber = async (req, res) => {
  try {
    const result = await verifyPhone(req.body);

    res.status(200).json(result);

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const resendOTP = async (req, res) => {
  try {
    const result = await resendOTPService(req.body);

    res.status(200).json(result);

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


      res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // res.status(200).json({
    //   success: true,
    //   message: "User logged in successfully",
    //   // data: { token },
    //   //data: { accessToken, refreshToken },
    // //data:{... tokens}  When you want to add or overwrite properties.
    //   data: tokens,
    // });

 res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: tokens.user,
        accessToken: tokens.accessToken,
      },
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
    // const { refreshToken } = req.body;

    const refreshToken = req.cookies.refreshToken; // Get the refresh token from the cookie

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



export const forgotPassword = async (req, res) => {

  try {

    const result = await forgotPasswordService(req.body);

    res.status(200).json(result);

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};


export const resetPassword = async (req, res) => {

  try {

    const result = await resetPasswordService(req.body);

    res.status(200).json(result);

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};



export const logout = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken; // Get the refresh token from the cookie

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