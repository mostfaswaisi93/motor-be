import JWT from "jsonwebtoken";
import { addNewUser } from "./user";
import users from "../Models/user";
import bcrypt from "bcrypt";
import error from "../Middleware/error";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  id?: string;
  body: {
    email: string;
    password: string;
    newPassword?: string;
    id?: string;
  };
}

export const authenticationLogin = async (request: AuthRequest, response: Response, next: NextFunction): Promise<void> => {
  try {
    error(request, response, next);
    let data = await users.findOne({ email: (request.body.email).toLowerCase().trim() });
    
    if (!data) throw new Error("invalid user");
    if (bcrypt.compareSync((request.body.password).trim(), data.password)) {
      let token = JWT.sign(
        {
          email: (request.body.email).toLowerCase().trim(),
          isAdmin: data.isAdmin,
          id: data._id,
        },
        process.env.SECRET_KEY || '',
        { expiresIn: "1d" }
      );
      const { password, ...others } = data.toObject();
      response.status(200).json({
        success: true,
        message: `You Successfully logged in`,
        data: others,
        token,
      });
    } else {
      throw new Error("Email or password is incorrect");
    }
  } catch (err) {
    next(err);
  }
};

export const authenticationRegister = (request: Request, response: Response, next: NextFunction): void => {
  error(request, response, next);
  addNewUser(request as any, response, next);
};

export const changepassword = async (request: AuthRequest, response: Response, next: NextFunction): Promise<void> => {
  try {
    error(request, response, next);
    if (request.id != request.body.id) throw new Error("Not Allowed");
    let data = await users.findOne({ _id: request.body.id });
    if (!data) throw new Error("invalid user");
      
    if (bcrypt.compareSync((request.body.password).trim(), data.password)) {
      data.password = bcrypt.hashSync((request.body.newPassword || '').trim(), 10);
      await data.save();
   
      const { password, ...others } = data.toObject();
      response.status(200).json({ message: "password changed correctly", success: true, data: others });
          
    } else {
      throw new Error("Your Password isn't Correct");
    }      
  } catch (err) {
    next(err);
  }
};
