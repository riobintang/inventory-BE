import { z } from 'zod';

const validateInventory = z.object({
    id: z.number().min(1),
    code: z.string().min(3),
    name: z.string().min(3),
    description: z.string().min(5),
    quantity: z.number().int().min(1),
    type: z.object({
        id: z.number().int().min(1),
        name: z.string().min(3),
        description: z.string().min(5),
    }),
});

const validateCreateEditInventory = z.object({
    code: z.string().min(3),
    name: z.string().min(3),
    description: z.string().min(5),
    quantity: z.number().int().min(1).nonnegative(),
    typeId: z.number().int().min(1),
});





export { validateInventory, validateCreateEditInventory };