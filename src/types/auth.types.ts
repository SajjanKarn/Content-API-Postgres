import { Request } from "express";

interface UserRegister {
  name: string;
  email: string;
  password: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface UserRequest extends Request {
  user: {
    id: string;
  };
}

export { UserRegister, UserLogin, UserRequest };
