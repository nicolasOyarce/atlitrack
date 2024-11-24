import { z } from "zod";

export const studentSchema = z.object({
    user_id: z.string().uuid(),
    email: z.string().email().max(150).optional(),
    password: z.string().min(1).max(100).optional(),
    repit_password: z.string().min(1).max(100).optional(),
});

export type Student = z.infer<typeof studentSchema>;

export const studentFormSchema = studentSchema.omit({ 

    user_id: true,
});

export type StudentFormData = z.infer<typeof studentFormSchema>;
