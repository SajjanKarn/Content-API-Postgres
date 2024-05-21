import dotenv from "dotenv";
import express, { Application } from "express";
import {
  developmentErrors,
  notFound,
  prismaValidationErrors,
  productionErrors,
} from "./handlers/handlers";
import authRouter from "./routes/auth.route";
import postRouter from "./routes/post.route";

dotenv.config({ path: "src/.env" });

const app: Application = express();

// middlewares
app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api", postRouter);

// error handlers
const NODE_ENV = process.env.NODE_ENV;
app.use(prismaValidationErrors);
app.use(notFound);
if (NODE_ENV) {
  app.use(developmentErrors);
} else {
  app.use(productionErrors);
}

// server config
const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT} on ${NODE_ENV} mode`);
});
