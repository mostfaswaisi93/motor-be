import express from "express";
import { body } from "express-validator";
import * as controller from '../Controller/auth';
import isAuth from '../Middleware/auth';

const router = express.Router();

router.post("/login",
  [
    body("email").isEmail().withMessage("Enter a Valid Email Address"),
    body("password")
      .not().isEmpty()
      .withMessage("Password Should not be Empty"),
  ], controller.authenticationLogin);

router.post("/register",
  [
    body('firstName').isString().withMessage('First Name should be String'),
    body('lastName').isString().withMessage('Last Name should be String'),
    body('email').isEmail().withMessage('Email isnot Valid'),
    body('userName').isString().withMessage('UserName is Required'),
    body('password').not().isEmpty().withMessage('Password is Required'),
    body("confirmPassword").custom((value, { req }) => {
      return (value).trim() == (req.body.password).trim();
    }).withMessage("password confirmation doesnot match"),
  ], controller.authenticationRegister);

router.post("/changePassword",
  [
    body("id").not().isEmpty().notEmpty().withMessage("User Id is Required"),
    body("password").not().isEmpty().withMessage("Password Should be String and not Empty"),
    body("newPassword").not().isEmpty().withMessage("New Password Should be String and not Empty"),
    body("confirmNewPassword").custom((value, { req }) => {
      return (value).trim() == (req.body.newPassword).trim();
    }).withMessage("password confirmation doesnot match")
  ], isAuth, controller.changepassword);

export default router;

