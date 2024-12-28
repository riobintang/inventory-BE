import dotenv from "dotenv";
import { z } from "zod";

export const jwtSecretKey = z.string().min(1).parse(process.env.JWT_SECRET);
export const jwtExpiredTime = z.string().min(1).parse(process.env.JWT_EXPIRED);
export const saltRounds = z.number().min(1).parse(Number(process.env.SALT_ROUNDS));