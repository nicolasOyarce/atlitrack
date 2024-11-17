import { z } from "zod";

export const ScheduleDisciplineSchema = z.object({
    schedule_discipline_id: z.number().int().positive(),
    discipline_id: z.string().min(1).max(100),
    day_id: z.string().min(1).max(100),
    hour_start_class: z.string().min(1).max(100).optional(),
    hour_end_class: z.string().min(1).max(100)
    
});

export type ScheduleDiscipline = z.infer<typeof ScheduleDisciplineSchema>;

export const scheduleDisciplineFormSchema = ScheduleDisciplineSchema.omit({ 
    schedule_discipline_id: true,
});

export type ScheduleDisciplineFormSchema = z.infer<typeof scheduleDisciplineFormSchema>;
