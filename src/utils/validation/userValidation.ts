import { z } from 'zod';

export const validateLogin = z.object({
    username: z.string().min(5),
    password: z.string().min(8),
});

export const validateCreate = z.object({
    username: z.string().min(5),
    name: z.string().min(4),
});

export const validateChangePassword = z.object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
    rePassword: z.string().min(8),
})

export const validateSetIsActive = z.object({
    isActive: z.boolean(),
})