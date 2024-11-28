import { UUID } from 'crypto';
import { ApiClient } from '../api-client';

export interface Student {
    user_id:UUID;
    email: string | null;
    password: string | null;
}

export const studentService = new ApiClient<Student>('/users/student');

export interface StudentConf {
    user_id:UUID;
    first_name: string;
    last_name: string;
    genre: string;
    email: string;
    phone: string;
    password: string;
    birthdate: string;
    weight: string;
    height: string;
}

export const studentConfService = new ApiClient<StudentConf>('/student/configurations');