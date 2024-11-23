import { UUID } from 'crypto';
import { ApiClient } from './api-client';

export interface Admin {
    user_id:UUID;
    first_name: string;
    last_name: string;
    genre: string;
    email: string;
    phone: string;
    password: string;
    address: string;
}

export const adminService = new ApiClient<Admin>('/admin/configurations');