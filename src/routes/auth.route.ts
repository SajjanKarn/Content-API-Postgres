import { Router } from "express";
import { catchAsync } from "../handlers/handlers";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const authRouter = Router();

authRouter
  .get("/user", catchAsync(getAllUsers))
  .get("/user/:id", catchAsync(getUser))
  .post("/user", catchAsync(createUser))
  .post("/user/login", catchAsync(loginUser))
  .put("/user", authMiddleware as any, catchAsync(updateUser))
  .delete("/user", authMiddleware as any, catchAsync(deleteUser));

export default authRouter;
