import asyncHandler from "express-async-handler";
import {Router} from "express";
import {
  registerUser,
  currentUser,
  loginUser,
} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.post("/register", asyncHandler(registerUser));

router.post("/login", asyncHandler(loginUser));

router.get("/current", validateToken, asyncHandler(currentUser));

export default router;
