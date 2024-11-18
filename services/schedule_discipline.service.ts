import { UUID } from 'crypto';
import { ApiClient } from './api-client';

export interface ScheduleDiscipline {
    schedule_for_discipline_id:number;
    day_id: string;
    hour_end_class: string;
    hour_start_class: string;
    discipline_id: string;
}

export const scheduleDisciplineService = new ApiClient<ScheduleDiscipline>('/admin/schedule-for-discipline');