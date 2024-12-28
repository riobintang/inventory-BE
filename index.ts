import express, { Request, Response, NextFunction, Application } from "express";
import dotenv from "dotenv";
import path from 'path';
import errorHandler from "./src/middleware/error";
import api from "./src/route";
import createHttpError, { CreateHttpError } from "http-errors";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", api);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = createHttpError(404, 'Not Found');
  next(error);
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
