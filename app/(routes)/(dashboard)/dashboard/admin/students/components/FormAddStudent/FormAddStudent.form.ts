import { z } from "zod";

export const SubscriptionSchema = z.object({
    student_sportcenter_id: z.number().int().positive(),
    sportcenter_id: z.string().min(1).max(100).optional(),
    student_id: z.string().min(1).max(100).optional(),
    subscription_date: z.string().min(1).max(100),
    expiration_date: z.string().min(1).max(100),
    status: z.string().min(1).max(100),
    last_renewal_date: z.string().min(1).max(100),
    plan_id: z.string().min(1).max(100),
  
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const subscriptionFormSchema = SubscriptionSchema.omit({ 
    student_sportcenter_id: true,
});

export type SubscriptionFormSchema = z.infer<typeof subscriptionFormSchema>;
