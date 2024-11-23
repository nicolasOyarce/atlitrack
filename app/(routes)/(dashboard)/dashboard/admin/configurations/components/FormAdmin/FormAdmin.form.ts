import { z } from "zod";

export const AdminSchema = z.object({
    user_id: z.string().min(1).max(100),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100),
    genre: z.string().min(1).max(100),
    email: z.string().email().max(150),
    phone: z.string().min(1).max(150),
    password: z.string().min(1).max(100), 
    address: z.string().min(1).max(100).optional(), 

});

export type Admin = z.infer<typeof AdminSchema>;

export const adminFormSchema = AdminSchema.omit({ 
    user_id: true,
});

export type AdminFormSchema = z.infer<typeof adminFormSchema>;
