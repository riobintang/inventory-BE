import { prisma } from "../../utils/prisma";
import { typeDTO } from "../../dto/typeDTO";
import { BadRequest, NotFound } from "http-errors";

async function getAllTypes(name?: string): Promise<typeDTO[]> {
  const data: typeDTO[] = await prisma.type.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
    where: {
      name: {
        contains: name,
      },
    },
  });

  return data;
}

async function getTypeById(id: number): Promise<typeDTO | Error> {
  const data: typeDTO | null = await prisma.type.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) {
    throw new NotFound("Type not found");
  }

  return data;
}

async function createType(data: typeDTO): Promise<typeDTO | Error> {
  const type: typeDTO = await prisma.type.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });

  return type;
}

async function editType(data: typeDTO, id: number): Promise<typeDTO | Error> {
  // const checkType: typeDTO | null = await prisma.type.findUnique({
  //   where: {
  //     id: id,
  //   },
  // });
  // if (!checkType) {
  //   throw new NotFound("Type not found");
  // }
  const type: typeDTO = await prisma.type.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });

  return type;
}

async function deleteType(id: number): Promise<typeDTO | Error> {
  const type: typeDTO | null = await prisma.type.delete({
    where: {
      id: id,
    },
  });
  return type;
}

export default { getAllTypes, getTypeById, createType, editType, deleteType };
