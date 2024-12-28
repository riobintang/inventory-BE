import jwt from "jsonwebtoken";
import { jwtSecretKey, jwtExpiredTime } from "./get-env";
import { userAuth } from "../dto/userDTO";

export default function generateToken(payload: userAuth): string {
  return jwt.sign(payload, jwtSecretKey, { expiresIn: jwtExpiredTime });
}
