"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.productionErrors = exports.developmentErrors = exports.prismaValidationErrors = exports.catchAsync = void 0;
const client_1 = require("@prisma/client");
const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch((err) => {
        if (typeof err === "string")
            return res.status(400).json({ error: err });
        else
            next(err);
    });
};
exports.catchAsync = catchAsync;
const prismaValidationErrors = (error, req, res, next) => {
    var _a;
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            // Handle unique constraint violation
            const uniqueFields = (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target;
            res.status(409).json({
                error: `The provided value for ${uniqueFields.join(", ")} is already taken`,
            });
        }
        else {
            // Handle other known Prisma errors
            res.status(400).json({
                error: "Prisma client error",
                code: error.code,
                details: error.meta,
            });
        }
    }
    else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        // Handle validation errors
        res.status(400).json({ error: "Validation error", details: error.message });
    }
    else {
        console.log(error);
        // Handle other errors
        res
            .status(500)
            .json({ error: "Internal server error", message: error.message });
    }
};
exports.prismaValidationErrors = prismaValidationErrors;
const developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || "";
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    };
    res.status(err.status || 500).json(errorDetails);
};
exports.developmentErrors = developmentErrors;
const productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: "Internal Server Error",
    });
};
exports.productionErrors = productionErrors;
const notFound = (req, res, next) => {
    res.status(404).json({
        error: "Not found",
    });
};
exports.notFound = notFound;
