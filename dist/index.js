"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
// routes
app.get("/", (req, res) => {
    return res.send("Hello World");
});
// server config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT} on ${process.env.NODE_ENV} mode`);
});
