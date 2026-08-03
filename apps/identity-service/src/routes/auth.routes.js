// Defines the endpoint
import express from "express";
import { register,login,refresh,logout} from "../controllers/auth.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

router.get("/profile", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.post("/logout", logout);



export default router;