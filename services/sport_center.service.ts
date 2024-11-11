import { ApiClient } from './api-client';

export interface SportCenter {
    id:number;
    sport_center_name: string;
    city_id: number;
    comuna_id: number;
    address: string;
    phone: string;
    mail: string;
    open_hour: string;
    close_hour: string;
}

export const sportCenterService = new ApiClient<SportCenter>('/admin/sport-centers');