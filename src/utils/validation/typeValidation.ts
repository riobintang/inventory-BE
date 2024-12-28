import { z } from "zod";


export const validateType = z.object({
    name: z.string().min(3),
    description: z.string().min(5),
});