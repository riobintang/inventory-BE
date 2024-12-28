import { prisma } from "../../utils/prisma";
import { User } from "@prisma/client";
import { compare, hashSync, hash, compareSync } from "bcrypt";
import { saltRounds } from "../../utils/get-env";
import generateToken from "../../utils/tokenManager";
import { dtoUser } from "../../dto/userDTO";
import generatePassword from "../../utils/generatePassword";
import { NotFound, Unauthorized, BadRequest } from "http-errors";

async function getAllUser({
  isActive = true,
  searchUser = null,
}: {
  isActive?: boolean;
  searchUser?: string | null;
}): Promise<dtoUser[] | null> {
  const users: dtoUser[] | null = await prisma.user.findMany({
    where: {
      AND: {
        isAdmin: false,
        isActive: isActive,
      },
      ...(searchUser && {
        OR: [
          {
            name: {
              contains: searchUser,
            },
          },
          {
            username: {
              contains: searchUser,
            },
          },
        ],
      }),
    },
    select: {
      id: true,
      username: true,
      name: true,
      isActive: true,
    },
  });
  return users;
}

async function getUserById(id: string): Promise<dtoUser | Error> {
  const user: dtoUser | null = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      createdAt: true,
      username: true,
      name: true,
      isActive: true,
    },
  });
  if (!user) {
    throw new NotFound("User not found");
  }
  return user;
}

async function userLogin(username: string, password: string): Promise<string> {
  const user: User | null = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new Unauthorized("Username or Password is incorrect");
  }

  // const hashPasword = await hash(password, 5);
  const isPasswordMatch = compareSync(password, user.password);

  if (!isPasswordMatch) {
    throw new Unauthorized("Username or Password is incorrect");
  }

  if (!user.isActive) {
    throw new Unauthorized("User is not active");
  }

  const token = generateToken({
    id: user.id,
    isAdmin: user.isAdmin,
  });

  return token;
}

async function createUser(
  username: string,
  name: string,
  isActive?: boolean
): Promise<dtoUser> {
  const userExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (userExist) {
    throw new BadRequest("Username already exist");
  }

  const password: string = generatePassword();
  const hashPassword = hashSync(password, saltRounds);

  const user = await prisma.user.create({
    data: {
      username: username,
      name: name,
      password: hashPassword,
      isActive: isActive,
    },
  });

  if (!user) {
    throw new Error("Failed to create user");
  }

  return {
    username: user.username,
    name: user.name,
    password: password,
  };
}

async function changePassword(
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<dtoUser> {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new BadRequest("User not found");
  }

  const isPasswordMatch = await compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new BadRequest("Old password is incorrect");
  }

  const newHashPassword = hashSync(newPassword, saltRounds);

  const userNew: dtoUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: newHashPassword,
    },
    select: {
      username: true,
      name: true,
    },
  });

  return userNew;
}

async function setActiveUser(id: string, isActive: boolean): Promise<dtoUser> {
  const user: dtoUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      isActive: isActive,
    },
    select: {
      username: true,
      name: true,
    },
  });

  return user;
}

async function resetPassword(id: string): Promise<string> {
  const password: string = generatePassword();
  const hashPassword = hashSync(password, saltRounds);

  const user: dtoUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: hashPassword,
    },
    select: {
      username: true,
      name: true,
      password: true,
    },
  });
  return password;
}

async function deleteUser(id: string): Promise<dtoUser> {


  const user: dtoUser = await prisma.user.delete({
    where: {
      id: id,
    },
    select: {
      username: true,
      name: true,
    }
  });
  return user;
}

export default {
  getAllUser,
  getUserById,
  userLogin,
  createUser,
  changePassword,
  setActiveUser,
  resetPassword,
  deleteUser,
};
