import { UUID } from 'crypto';
import { ApiClient } from './api-client';

export interface Subscription {
    student_sportcenter_id: number;
    sportcenter_id: string;
    student_id: string;
    subscription_date: string;
    expiration_date: string;
    status: string;
    last_renewal_date: string;
    plan_id: string;
}

export const subscriptionService = new ApiClient<Subscription>('/admin/subscription');