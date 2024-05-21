"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlers_1 = require("../handlers/handlers");
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const postRouter = (0, express_1.Router)();
postRouter
    .get("/post", auth_middleware_1.authMiddleware, (0, handlers_1.catchAsync)(post_controller_1.getAllPosts))
    .get("/post/:id", auth_middleware_1.authMiddleware, (0, handlers_1.catchAsync)(post_controller_1.getPost))
    .post("/post", auth_middleware_1.authMiddleware, (0, handlers_1.catchAsync)(post_controller_1.createPost))
    .put("/post/:id", auth_middleware_1.authMiddleware, (0, handlers_1.catchAsync)(post_controller_1.updatePost))
    .put("/post/:id/publish", auth_middleware_1.authMiddleware, (0, handlers_1.catchAsync)(post_controller_1.publishPost))
    .delete("/post/:id", auth_middleware_1.authMiddleware, (0, handlers_1.catchAsync)(post_controller_1.deletePost));
exports.default = postRouter;
