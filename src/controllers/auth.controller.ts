import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import { UserRegister, UserRequest } from "../types/auth.types";

const userClient = new PrismaClient().user;

const validateUserDeatils = (name: string, email: string, password: string) => {
  if (!name || !email || !password) throw "All fields are required";

  // name, email, password validation
  if (name.length < 3) throw "Name must be at least 3 characters";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw "Invalid email";

  if (password.length < 6) throw "Password must be at least 6 characters";
};

// read all user
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userClient.findMany();
    return res.status(200).json(users);
  } catch (error) {
    throw error;
  }
};

// read user
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw "User id is required";

  try {
    const user = await userClient.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw "User not found";

    return res.status(200).json(user);
  } catch (error) {
    throw error;
  }
};

// create user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password }: UserRegister = req.body;

  validateUserDeatils(name, email, password);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userClient.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    throw error;
  }
};

// login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) throw "Email and password are required";

  try {
    const user = await userClient.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw "User not found";

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw "Invalid password";

    const payload: {
      id: string;
    } = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    return res.status(200).json({ ...user, token });
  } catch (error) {
    throw error;
  }
};

// update user
export const updateUser = async (req: UserRequest, res: Response) => {
  const id = req.user.id;

  if (!id) throw "User id is required";

  // check if email is also provided
  if (req.body?.email) throw "Email cannot be updated";

  if (req.body?.name) {
    if (req.body.name.length < 3) throw "Name must be at least 3 characters";
  }

  if (req.body?.password) {
    if (req.body.password.length < 6)
      throw "Password must be at least 6 characters";
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }

  try {
    const user = await userClient.update({
      where: {
        id,
      },
      data: req.body,
    });

    return res.status(200).json(user);
  } catch (error) {
    throw error;
  }
};

// delete user
export const deleteUser = async (req: UserRequest, res: Response) => {
  const id = req.user.id;

  if (!id) throw "User id is required";

  try {
    const user = await userClient.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    throw error;
  }
};
