import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { Prisma } from "@prisma/client";
import ResponseBody from "../utils/response";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

async function errorHandler(
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction, 
): Promise<any> {
  const body: ResponseBody = {
    status: "fail",
    message: e.message,
  };
  if (e instanceof SyntaxError) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid JSON format",
    });
  }
  
  if (e instanceof HttpError) {
    return res.status(e.statusCode).json(body);
  }
  
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.meta?.cause) {
    if (e.code === "P2025") {
      body.message = JSON.parse(JSON.stringify(e.meta.cause));
      return res.status(404).json(body);
    }
    console.log(e);
    // return res.status(409).json(body);
  }
  if (e instanceof JsonWebTokenError) {
    return res.status(401).json(body);
  }
  if (e instanceof ZodError) {
    const message: string = e.errors
      .map((err) => {
        const fieldName = err.path.join("."); 
        const validationMessage = err.message.replace("String ", ""); 
        return `${fieldName} ${validationMessage}`; 
      })
      .join(", ");
    body.message = message;
    return res.status(400).json(body);
  }

  body.status = "error";
  body.message = "Internal Server Error";
  console.log(e.message);
  return res.status(500).json(body);
}

export default errorHandler;
