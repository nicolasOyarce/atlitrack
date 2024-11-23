import { UUID } from 'crypto';
import { ApiClient } from './api-client';

export interface Schedule {
    schedule_id: number;
    date: string; 
    time: string; 
    student: string;
    student_email: string;
    plan_name: string;
    discipline_name: string;
}


export const scheduleService = new ApiClient<Schedule>('/admin/schedule');