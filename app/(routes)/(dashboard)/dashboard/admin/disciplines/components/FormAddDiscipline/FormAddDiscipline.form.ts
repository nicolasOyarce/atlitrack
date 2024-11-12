import { z } from "zod";

export const DisciplineSchema = z.object({
    discipline_id: z.number().int().positive(),
    discipline_name: z.string().min(1).max(100),
    trainer_id: z.string().min(1).max(100).optional(),
    student_max_quantity: z.string().min(1).max(100)
    
});

export type SportCenter = z.infer<typeof DisciplineSchema>;

export const disciplineFormSchema = DisciplineSchema.omit({ 
    discipline_id: true,
});

export type DisciplineFormSchema = z.infer<typeof disciplineFormSchema>;
