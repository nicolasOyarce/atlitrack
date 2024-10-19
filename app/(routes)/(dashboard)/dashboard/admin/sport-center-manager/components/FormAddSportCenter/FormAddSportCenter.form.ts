import { z } from "zod";

export const sportCenterSchema = z.object({
    sport_center_id: z.number().int().positive(),
    sport_center_name: z.string().min(1).max(100),
    city_id: z.number().int().positive(),
    comuna_id: z.number().int().positive(),
    address: z.string().min(1).max(150),
    phone: z.number().int().positive(),
    mail: z.string().email().max(150),
    open_hour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Debe ser un formato de hora válido HH:MM"),
    close_hour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Debe ser un formato de hora válido HH:MM"),
    user_id: z.string().uuid(),
});

export type SportCenter = z.infer<typeof sportCenterSchema>;

export const sportCenterFormSchema = sportCenterSchema.omit({ 
    sport_center_id: true,
    user_id: true,
    city_id: true,
    comuna_id: true 
});

export type SportCenterFormData = z.infer<typeof sportCenterFormSchema>;
