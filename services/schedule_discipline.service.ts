import { UUID } from 'crypto';
import { ApiClient } from './api-client';

export interface ScheduleDiscipline {
    schedule_discipline_id:number;
    discipline_id: string;
    day_id: string;
    hour_start_class: string;
    hour_end_class: string;
}

export const scheduleDisciplineService = new ApiClient<ScheduleDiscipline>('/admin/schedule-for-discipline');