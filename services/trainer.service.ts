import { UUID } from 'crypto';
import { ApiClient } from './api-client';

export interface Trainer {
    user_id:UUID;
    first_name: string;
    last_name: string;
    genre: string;
    email: string;
    phone: string;
    password: string;
    rut: string;
    salary: string;
}

export const trainerService = new ApiClient<Trainer>('/admin/trainer');