import { z } from "zod";

export const DisciplineSchema = z.object({
    sport_center_id: z.number().int().positive(),
    sport_center_name: z.string().min(1).max(100),
    city_id: z.number().int().positive(),
    comuna_id: z.number().int().positive(),
    address: z.string().min(1).max(150),
    phone: z.string().min(1).max(10),
    mail: z.string().email().max(150),
    open_hour: z.string().max(10),
    close_hour: z.string().max(10),
    user_id: z.string().uuid(),
});

export type SportCenter = z.infer<typeof DisciplineSchema>;

export const disciplineFormSchema = DisciplineSchema.omit({ 
    sport_center_id: true,
    user_id: true,
});

export type DisciplineFormSchema = z.infer<typeof disciplineFormSchema>;
