import { Router } from "express";
import { catchAsync } from "../handlers/handlers";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter
  .get("/user", catchAsync(getAllUsers))
  .get("/user/:id", catchAsync(getUser))
  .post("/user", catchAsync(createUser))
  .put("/user/:id", catchAsync(updateUser))
  .delete("/user/:id", catchAsync(deleteUser));

export default authRouter;
