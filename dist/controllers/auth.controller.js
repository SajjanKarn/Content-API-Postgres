"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const userClient = new client_1.PrismaClient().user;
const validateUserDeatils = (name, email, password) => {
    if (!name || !email || !password)
        throw "All fields are required";
    // name, email, password validation
    if (name.length < 3)
        throw "Name must be at least 3 characters";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        throw "Invalid email";
    if (password.length < 6)
        throw "Password must be at least 6 characters";
};
// read all user
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userClient.findMany();
        return res.status(200).json(users);
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
// read user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw "User id is required";
    try {
        const user = yield userClient.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            throw "User not found";
        return res.status(200).json(user);
    }
    catch (error) {
        throw error;
    }
});
exports.getUser = getUser;
// create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    validateUserDeatils(name, email, password);
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userClient.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return res.status(201).json(user);
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
// login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        throw "Email and password are required";
    try {
        const user = yield userClient.findUnique({
            where: {
                email,
            },
        });
        if (!user)
            throw "User not found";
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            throw "Invalid password";
        const payload = {
            id: user.id,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
        });
        return res.status(200).json(Object.assign(Object.assign({}, user), { token }));
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;
// update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const id = req.user.id;
    if (!id)
        throw "User id is required";
    // check if email is also provided
    if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.email)
        throw "Email cannot be updated";
    if ((_b = req.body) === null || _b === void 0 ? void 0 : _b.name) {
        if (req.body.name.length < 3)
            throw "Name must be at least 3 characters";
    }
    if ((_c = req.body) === null || _c === void 0 ? void 0 : _c.password) {
        if (req.body.password.length < 6)
            throw "Password must be at least 6 characters";
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    }
    try {
        const user = yield userClient.update({
            where: {
                id,
            },
            data: req.body,
        });
        return res.status(200).json(user);
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
// delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    if (!id)
        throw "User id is required";
    try {
        const user = yield userClient.delete({
            where: {
                id,
            },
        });
        return res.status(200).json(user);
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUser = deleteUser;
