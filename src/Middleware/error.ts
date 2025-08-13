import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

const error = (request: Request, response: Response, next: NextFunction): void => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error: CustomError = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + ", ", "");
    throw error;
  }
};

export default error;
