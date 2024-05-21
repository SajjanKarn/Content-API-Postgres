import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../types/auth.types";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json("Unauthorized");
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json("Unauthorized");
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as any;

    if (!decoded) {
      return res.status(401).json("Unauthorized");
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json("Unauthorized");
  }
};
