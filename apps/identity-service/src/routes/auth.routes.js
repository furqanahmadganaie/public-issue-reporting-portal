// Defines the endpoint
import express from "express"; // bcz we need its Router class to create a new router instance for defining routes related to authentication.
import { register,login,refresh,logout,verifyPhoneNumber,resendOTP,forgotPassword,resetPassword} from "../controllers/auth.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";


const router = express.Router(); // Create a new router instance using the Router class from Express. 
// This router will be used to define routes related to authentication, such as registration, login, 
// and password reset. The router instance allows you to group related routes together and apply
//  middleware specific to those routes.

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", refresh);

router.post( "/verify-phone", verifyPhoneNumber);

router.post("/resend-otp", resendOTP);

 router.post("/forgot-password", forgotPassword);    
 
 router.post("/reset-password", resetPassword);


// means that the user must be authenticated and have the "Citizen" role to access this route. 
// The authenticate middleware checks if the user is logged in, while the authorize middleware
//  checks if the user has the required role. If both conditions are met, the user can access
//  their profile information.
router.get(
  "/profile",authenticate,authorize(["Citizens "]),
  (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

router.post("/logout", logout);



export default router;