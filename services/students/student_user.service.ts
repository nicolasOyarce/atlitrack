import { UUID } from 'crypto';
import { ApiClient } from '../api-client';

export interface Student {
    user_id:UUID;
    email: string | null;
    password: string | null;
}

export const studentService = new ApiClient<Student>('/users/student');