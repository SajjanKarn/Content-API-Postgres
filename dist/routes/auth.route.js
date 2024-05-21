"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlers_1 = require("../handlers/handlers");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authRouter = (0, express_1.Router)();
authRouter
    .get("/user", (0, handlers_1.catchAsync)(auth_controller_1.getAllUsers))
    .get("/user/:id", (0, handlers_1.catchAsync)(auth_controller_1.getUser))
    .post("/user", (0, handlers_1.catchAsync)(auth_controller_1.createUser))
    .post("/user/login", (0, handlers_1.catchAsync)(auth_controller_1.loginUser))
    .put("/user", auth_middleware_1.authMiddleware, (0, handlers_1.catchAsync)(auth_controller_1.updateUser))
    .delete("/user", auth_middleware_1.authMiddleware, (0, handlers_1.catchAsync)(auth_controller_1.deleteUser));
exports.default = authRouter;
