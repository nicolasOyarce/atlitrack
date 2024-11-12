import { UUID } from 'crypto';
import { ApiClient } from './api-client';

export interface Discipline {
    discipline_id:number;
    discipline_name: string;
    trainer_id: string;
    student_max_quantity: string;
}

export const disciplineService = new ApiClient<Discipline>('/admin/discipline');