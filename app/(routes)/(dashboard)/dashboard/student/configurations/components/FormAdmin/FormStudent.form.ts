import { z } from "zod";

export const StudentSchema = z.object({
    user_id: z.string().min(1).max(100),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100),
    genre: z.string().min(1).max(100),
    email: z.string().email().max(150),
    phone: z.string().min(1).max(150),
    password: z.string().min(1).max(100), 
    birthdate: z.string().min(1).max(100).optional(), 
    weight: z.string().min(1).max(100).optional(), 
    height: z.string().min(1).max(100).optional(), 

});

export type Student = z.infer<typeof StudentSchema>;

export const studentFormSchema = StudentSchema.omit({ 
    user_id: true,
});

export type StudentFormSchema = z.infer<typeof studentFormSchema>;
