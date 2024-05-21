"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const handlers_1 = require("./handlers/handlers");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
dotenv_1.default.config({ path: "src/.env" });
const NODE_ENV = process.env.NODE_ENV;
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
if (NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// routes
app.use("/api/auth", auth_route_1.default);
app.use("/api", post_route_1.default);
// error handlers
app.use(handlers_1.notFound);
if (NODE_ENV === "development") {
    app.use(handlers_1.developmentErrors);
}
else {
    app.use(handlers_1.productionErrors);
}
// server config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT} on ${NODE_ENV} mode`);
});
