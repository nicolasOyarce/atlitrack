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

export interface TrainerSportcenter {
    trainer_sportcenter_id: number;
    sportcenter_id: string;
    trainer_id: string;
}

export const trainerSportcenterService = new ApiClient<TrainerSportcenter>('/admin/trainer_sportcenter');
