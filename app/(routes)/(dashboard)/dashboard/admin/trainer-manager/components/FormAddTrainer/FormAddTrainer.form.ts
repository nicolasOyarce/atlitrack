import { z } from "zod";

export const trainerSchema = z.object({
    user_id: z.string().uuid(),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100),
    genre: z.string().min(1).max(100),
    email: z.string().email().max(150),
    phone: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    rut: z.string().min(1).max(100),
    salary: z.string().min(1).max(100),
    sportcenter_id: z.string().min(1).max(100),
});

export type Trainer = z.infer<typeof trainerSchema>;

export const trainerFormSchema = trainerSchema.omit({ 

    user_id: true,
});

export type TrainerFormData = z.infer<typeof trainerFormSchema>;
