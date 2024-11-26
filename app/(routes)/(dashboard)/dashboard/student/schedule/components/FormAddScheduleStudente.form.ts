import { z } from "zod";

export const ScheduleStudentSchema = z.object({
    student_sportcenter_id: z.number().int().positive(),
    date: z.string().min(1).max(100),
    time: z.string().min(1).max(100),
});

export type ScheduleStudent = z.infer<typeof ScheduleStudentSchema>;

export const scheduleStudentFormSchema = ScheduleStudentSchema.omit({ 
});

export type ScheduleStudentFormSchema = z.infer<typeof scheduleStudentFormSchema>;
