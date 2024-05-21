import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import {
  developmentErrors,
  notFound,
  prismaValidationErrors,
  productionErrors,
} from "./handlers/handlers";
import authRouter from "./routes/auth.route";
import postRouter from "./routes/post.route";

dotenv.config({ path: "src/.env" });
const NODE_ENV = process.env.NODE_ENV;

const app: Application = express();

// middlewares
app.use(express.json());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/auth", authRouter);
app.use("/api", postRouter);

// error handlers

app.use(notFound);
if (NODE_ENV === "development") {
  app.use(developmentErrors);
} else {
  app.use(productionErrors);
}

// server config
const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT} on ${NODE_ENV} mode`);
});
