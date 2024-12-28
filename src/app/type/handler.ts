import ResponseBody from "../../utils/response";
import { Request, Response, NextFunction } from "express";
import svc from "../../service/mysql/typeService";
import { typeDTO } from "../../dto/typeDTO";
import { validateType } from "../../utils/validation/typeValidation";

async function getAllType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const data: typeDTO[] | null = await svc.getAllTypes();
    const body: ResponseBody = {
      status: "success",
      message: "Success get all Types",
      data: {
        type: data,
      },
    };
    res.json(body);
  } catch (e) {
    next(e);
  }
}

async function getTypeById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const id: number = parseInt(req.params.id);
    const data: typeDTO | Error = await svc.getTypeById(id);
    const body: ResponseBody = {
      status: "success",
      message: "Success get Type by id",
      data: {
        type: data,
      },
    };
    res.json(body);
  } catch (e) {
    next(e);
  }
}

async function createType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const data: typeDTO = await validateType.parseAsync(req.body);
    await svc.createType(data);
    const body: ResponseBody = {
      status: "success",
      message: "Success create Type",
    };
    res.json(body);
  } catch (e) {
    next(e);
  }
}

async function editType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const data: typeDTO = await validateType.parseAsync(req.body);
    const { id } = req.params;
    await svc.editType(data, Number(id));
    const body: ResponseBody = {
      status: "success",
      message: "Success update Type",
    };
    res.json(body);
  } catch (e) {
    next(e);
  }
}

async function deleteType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.params;
    await svc.deleteType(Number(id));
    const body: ResponseBody = {
      status: "success",
      message: "Success delete Type",
    };
    res.json(body);
  } catch (e) {
    next(e);
  }
}

export default { getAllType, getTypeById, createType, editType, deleteType };
