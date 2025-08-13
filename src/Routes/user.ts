import express from 'express';
import { body } from 'express-validator';
import * as controller from '../Controller/user';
import isAuth from "../Middleware/auth";

const router = express.Router();

router.route('/profile')
  .post([
    body('firstName').isString().withMessage('First Name should be String'),
    body('lastName').isString().withMessage('Last Name should be String'),
    body('email').isEmail().withMessage('Email isnot Valid'),
    body('userName').isString().withMessage('UserName is Required'),
    body('password').not().isEmpty().withMessage('Password is Required'),
  ], controller.addNewUser)
  .put([
    body('id').not().isEmpty().withMessage('id is Required'),
    body('firstName').isString().withMessage('User Name should be String'),
    body('lastName').isString().withMessage('User Name should be String'),
    body('email').isEmail().withMessage('Email isnot Valid'),
    body('userName').isString().withMessage('UserName is Required'),
  ], isAuth, controller.updateUser);

router.route('/profile/:id')
  .get(isAuth, controller.getUserById)
  .delete(isAuth, controller.deleteUser);

export default router;

