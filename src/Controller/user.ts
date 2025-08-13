import users from "../Models/user";
import bcrypt from "bcrypt";
import error from "../Middleware/error";
import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserRequest extends Request {
  id?: string;
  isAdmin?: boolean;
  body: {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    id?: string;
  };
  params: {
    id: string;
  };
}

//get User by id
export const getUserById = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.isAdmin || req.id == req.params.id) {
      let data = await users.findOne({ _id: req.params.id });
      if (data == null) throw new Error('user isnot found');

      const { password, ...others } = data.toObject();

      res.status(200).json({ message: "Fetching User By Id", success: true, data: others });
    } else {
      throw new Error("Authorized for Admin and Owner only!!");
    }
  } catch (err) {
    next(err);
  }
};

//create User
export const addNewUser = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    error(req, res, next);
    const checkEmail = await users.findOne({ email: (req.body.email).toLowerCase().trim() });
    const userName = await users.findOne({ userName: (req.body.userName).trim() });
    if (checkEmail != null) throw new Error('Duplicated Email Found');
    if (userName != null) throw new Error('Duplicated userName Found');

    let obj = new users({
      firstName: (req.body.firstName).trim(),
      lastName: (req.body.lastName).trim(),
      email: (req.body.email).toLowerCase().trim(),
      userName: (req.body.userName).trim(),
      password: bcrypt.hashSync((req.body.password).trim(), 10),
    });

    const data = await obj.save();
    
    let token = JWT.sign(
      {
        email: (req.body.email).toLowerCase().trim(),
        isAdmin: data.isAdmin,
        id: data._id,
      },
      process.env.SECRET_KEY || '',
      { expiresIn: "1d" }
    );

    const { password, ...others } = data.toObject();
    res.status(200).json({
      success: true,
      message: `Hello ${data.firstName} ${data.lastName}, Your Account has been Created`,
      data: others,
      token,
    });
    
  } catch (err) {
    next(err);
  }
};

//Update User
export const updateUser = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    error(req, res, next);
    if (req.body.id != req.id && !req.isAdmin) throw new Error("Not Allowed!");

    const user = await users.findOne({ _id: req.body.id });
    if (user == null) throw new Error("User Is not Found!");
    
    const checkEmail = await users.findOne({ email: (req.body.email).toLowerCase().trim() });
    if (checkEmail != null && checkEmail?.email != user.email) throw new Error("Duplicated Email Found");

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = (req.body.email).toLowerCase().trim();
    user.userName = (req.body.userName).trim();
    await user.save();

    res.status(201).json({ message: "Updated successfully", success: true, user });
  } catch (err) {
    next(err);
  }
};

//Delete User
export const deleteUser = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error("Not Allowed");
    
    let data = await users.findOneAndDelete({ _id: req.params.id });
    if (data == null) throw new Error("User Is not Found!");

    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (err) {
    next(err);
  }
};

