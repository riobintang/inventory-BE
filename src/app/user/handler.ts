import ResponseBody from "../../utils/response";
import { Request, Response, NextFunction } from "express";
import svc from "../../service/mysql/userService";
import { dtoUser } from "../../dto/userDTO";
import {
  validateChangePassword,
  validateCreate,
  validateLogin,
  validateSetIsActive,
} from "../../utils/validation/userValidation";
import { BadRequest, NotFound } from "http-errors";

async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const searchUser: string | null = req.query.searchuser as string;
    const data: dtoUser[] | null = await svc.getAllUser({
      searchUser: searchUser,
    });

    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully get all User",
      data: { user: data },
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.params;
    const data: dtoUser | Error = await svc.getUserById(id);

    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully get User by id",
      data: { user: data },
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { username, password } = await validateLogin.parseAsync(req.body);
    const token: string = await svc.userLogin(username, password);
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully login",
      data: { token: token },
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function addAuditor(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { username, name } = validateCreate.parse(req.body);
    const data: dtoUser = await svc.createUser(username, name);
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully add Auditor",
      data: { user: data },
    };
    return res.status(201).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function changePasswordUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { oldPassword, newPassword, rePassword } =
      validateChangePassword.parse(req.body);
    if (newPassword !== rePassword) {
      throw new BadRequest("New password and retype password not match");
    }
    await svc.changePassword(req.userauth.id, oldPassword, newPassword);
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully change password",
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function settingActiveUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.params;
    const { isActive } = validateSetIsActive.parse(req.body);
    await svc.setActiveUser(id, isActive);
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully setting active user",
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function resetPasswordAuditor(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.params;
    const password = await svc.resetPassword(id);
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully reset password auditor",
      data: { user: { password: password } },
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.params;
    await svc.deleteUser(id);
    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully delete user",
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const data: dtoUser | Error = await svc.getUserById(req.userauth.id);

    const dataMsg: ResponseBody = {
      status: "success",
      message: "Successfully get profile",
      data: { user: data },
    };
    return res.status(200).json(dataMsg);
  } catch (e) {
    next(e);
  }
}

export default {
  getAllUser,
  getUserById,
  userLogin,
  addAuditor,
  changePasswordUser,
  settingActiveUser,
  resetPasswordAuditor,
  deleteUser,
  getProfile,
};
