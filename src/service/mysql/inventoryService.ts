import { createInventoryDTO, inventoryDTO } from "../../dto/inventoryDTO";
import { typeDTO } from "../../dto/typeDTO";
import { prisma } from "../../utils/prisma";
import { BadRequest, NotFound } from "http-errors";

async function getAllInventory(): Promise<inventoryDTO[]> {
  const data: inventoryDTO[] = await prisma.inventory.findMany({
    select: {
      code: true,
      name: true,
      description: true,
      quantity: true,
      type: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });

  return data;
}

async function getInventoryById(id: number): Promise<inventoryDTO | Error> {
  const data: inventoryDTO | null = await prisma.inventory.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      quantity: true,
      type: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });

  if (!data) {
    throw new NotFound("Record not found");
  }

  return data;
}

async function createInventory(
  data: createInventoryDTO
): Promise<createInventoryDTO | Error> {
  const checkCode: inventoryDTO | null = await prisma.inventory.findUnique({
    where: {
      code: data.code,
    },
  });

  if (checkCode) {
    throw new BadRequest("Code already exist");
  }

  const typeExist = await prisma.type.findUnique({
    where: {
      id: data.typeId,
    },
  });

  if (!typeExist) {
    throw new BadRequest("Type is not exist");
  }

  const inventory: createInventoryDTO = await prisma.inventory.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      typeId: data.typeId,
    },
  });

  return inventory;
}

async function editInventory(
  id: number,
  data: createInventoryDTO
): Promise<createInventoryDTO | Error> {
  // Check type is exist
  const checkType: typeDTO | null = await prisma.type.findUnique({
    where: {
      id: data.typeId,
    },
  });
  if (!checkType) {
    throw new BadRequest("Type not found");
  }
  const inventoryExist = await prisma.inventory.findUnique({
    where: {
      id: id,
    },
  });

  if (!inventoryExist) {
    throw new NotFound("Record not found");
  }

  // Check new code is exist
  const checkNewCode: inventoryDTO | null = await prisma.inventory.findUnique({
    where: {
      code: data.code,
      NOT: {
        id: id,
      },
    },
  });
  if (checkNewCode) {
    throw new BadRequest("Code already exists");
  }
  const inventory: createInventoryDTO = await prisma.inventory.update({
    where: {
      id: id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      typeId: data.typeId,
    },
  });

  return inventory;
}

async function deleteInventory(id: number): Promise<inventoryDTO | Error> {
  const inventory: inventoryDTO | Error = await prisma.inventory.delete({
    where: {
      id: id,
    },
  });

  return inventory;
}

export default {
  getAllInventory,
  getInventoryById,
  createInventory,
  editInventory,
  deleteInventory,
};
