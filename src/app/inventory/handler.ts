import ResponseBody from "../../utils/response";
import { Request, Response, NextFunction } from "express";
import svc from "../../service/mysql/inventoryService";
import { createInventoryDTO, inventoryDTO } from "../../dto/inventoryDTO";
import {
  validateCreateEditInventory,
  validateInventory,
} from "../../utils/validation/inventoryValidation";

async function getAllInventories(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {

    const data: inventoryDTO[] = await svc.getAllInventory();
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully get all Inventories",
      data: { inventory: data },
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function getInventoryById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.params;
    const data: inventoryDTO | Error = await svc.getInventoryById(Number(id));

    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully get Inventory by id",
      data: { inventory: data },
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function addInventory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const data: createInventoryDTO =
      await validateCreateEditInventory.parseAsync(req.body);
    await svc.createInventory(data);
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully add Inventory",
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function updateInventory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.params;
    const data: createInventoryDTO =
      await validateCreateEditInventory.parseAsync(req.body);
    await svc.editInventory(Number(id), data);
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully update Inventory",
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function removeInventory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.params;
    await svc.deleteInventory(Number(id));
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully delete Inventory",
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

export default {
  getAllInventories,
  getInventoryById,
  addInventory,
  updateInventory,
  removeInventory,
};
