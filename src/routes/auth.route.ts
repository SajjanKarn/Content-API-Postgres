import { Router } from "express";
import { catchAsync } from "../handlers/handlers";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter
  .get("/user", catchAsync(getAllUsers))
  .get("/user/:id", catchAsync(getUser))
  .post("/user", catchAsync(createUser));

export default authRouter;
