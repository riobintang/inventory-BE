import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { BadRequest, Unauthorized, Forbidden } from "http-errors";
import { jwtSecretKey } from "../utils/get-env";

async function verify(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      throw BadRequest("Token is required");
    }

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, jwtSecretKey);
    const user = JSON.parse(JSON.stringify(decoded));
    req.userauth = {
      id: user.id,
      isAdmin: user.isAdmin,
    };

    return next();
  } catch (e) {
    next(e);
  }
}

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = req.userauth.isAdmin;
    if (!isAdmin) {
      throw Forbidden("You are not allowed to access");
    }

    return next();
  } catch (e) {
    next(e);
  }
}

export { verify, verifyAdmin };
