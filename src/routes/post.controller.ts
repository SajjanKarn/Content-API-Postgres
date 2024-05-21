import { Router } from "express";
import { catchAsync } from "../handlers/handlers";
import { getAllPosts } from "../controllers/post.controller";

const postRouter = Router();

postRouter.get("/post", catchAsync(getAllPosts));

export default postRouter;
