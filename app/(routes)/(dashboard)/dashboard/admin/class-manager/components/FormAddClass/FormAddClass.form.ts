import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    dicipline: z.string().min(2).max(50),
    students: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    avaible: z.string().min(2).max(50),
    value: z.string().min(2).max(50),
})