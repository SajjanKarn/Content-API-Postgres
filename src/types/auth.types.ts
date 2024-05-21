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

interface DecodedToken {
  id: string;
}

interface UserRequest extends Request {
  user: DecodedToken;
}

export { UserRegister, UserLogin, UserRequest };
