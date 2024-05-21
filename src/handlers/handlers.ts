import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: string | Error) => {
      if (typeof err === "string") return res.status(400).json({ error: err });
      else next(err);
    });
  };

export const prismaValidationErrors = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      // Handle unique constraint violation
      const uniqueFields: any = error?.meta?.target;
      res.status(409).json({
        error: `The provided value for ${uniqueFields.join(
          ", "
        )} is already taken`,
      });
    } else {
      // Handle other known Prisma errors
      res.status(400).json({
        error: "Prisma client error",
        code: error.code,
        details: error.meta,
      });
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    // Handle validation errors
    res.status(400).json({ error: "Validation error", details: error.message });
  } else {
    console.log(error);
    // Handle other errors
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const developmentErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };
  res.status(err.status || 500).json(errorDetails);
};

export const productionErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    error: "Internal Server Error",
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: "Not found",
  });
};
