import asyncHandler from "express-async-handler" 
import {Router} from "express";
const router = Router();
import {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";

router.use(validateToken);

router.route("/")
.get(asyncHandler(getContacts))
.post(asyncHandler(createContact));

router.route("/:id")
.get(asyncHandler(getContact))
.put(asyncHandler(updateContact))
.delete(asyncHandler(deleteContact));

export default router;
