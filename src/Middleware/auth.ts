import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  id?: string;
  email?: string;
  isAdmin?: boolean;
}

interface DecodedToken {
  id: string;
  email: string;
  isAdmin: boolean;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  let token: string;
  let decode: DecodedToken;
  
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const err = new Error("Authorization header missing");
      err.status = 403;
      return next(err);
    }
    
    token = authHeader.split(" ")[1];
    decode = JWT.verify(token, process.env.SECRET_KEY || '') as DecodedToken;
  } catch (err: any) {
    err.message = "YOU AREN'T AUTHENTICATED";
    (err as any).status = 403;
    return next(err);
  }

  if (decode !== undefined) {
    req.id = decode.id;
    req.email = decode.email;
    req.isAdmin = decode.isAdmin;
    next();
  }
};

export default auth;
