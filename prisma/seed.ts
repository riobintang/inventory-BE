import { prisma } from "../src/utils/prisma";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { saltRounds } from "../src/utils/get-env";

async function seedAdmin(){
    const password: string = hashSync("randomrandom", saltRounds);
    await prisma.user.upsert({
        where: {
            username: "admin",
        },
        update: {},
        create: {
            username: "admin",
            name: "admin inventory",
            password: password,
            isAdmin: true,
        }
    });
}

seedAdmin() 
