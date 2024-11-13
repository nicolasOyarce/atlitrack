import { UUID } from 'crypto';
import { ApiClient } from './api-client';

export interface Plan {
    discipline_id: string;
    plan_name: string;
    description: string;
    classes_quantity: string;
    duration: string;
    price: string;
    is_active: boolean;
}

export const planService = new ApiClient<Plan>('/admin/plan');