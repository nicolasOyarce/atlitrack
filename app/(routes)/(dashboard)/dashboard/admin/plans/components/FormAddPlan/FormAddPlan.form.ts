import { z } from "zod";

export const PlanSchema = z.object({
    plan_id: z.number().int().positive(),
    discipline_id: z.string().min(1).max(100),
    plan_name: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    classes_quantity: z.string().min(1).max(100),
    duration: z.string().min(1).max(100).optional(),
    price: z.string().min(1).max(100),
    is_active: z.boolean().optional()
    
});

export type SportCenter = z.infer<typeof PlanSchema>;

export const planFormSchema = PlanSchema.omit({ 
    plan_id: true,
});

export type PlanFormSchema = z.infer<typeof planFormSchema>;
