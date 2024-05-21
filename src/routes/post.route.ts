import { Router } from "express";
import { catchAsync } from "../handlers/handlers";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  publishPost,
  updatePost,
} from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const postRouter = Router();

postRouter
  .get("/post", authMiddleware as any, catchAsync(getAllPosts))
  .get("/post/:id", authMiddleware as any, catchAsync(getPost))
  .post("/post", authMiddleware as any, catchAsync(createPost))
  .put("/post/:id", authMiddleware as any, catchAsync(updatePost))
  .put("/post/:id/publish", authMiddleware as any, catchAsync(publishPost))
  .delete("/post/:id", authMiddleware as any, catchAsync(deletePost));

export default postRouter;
