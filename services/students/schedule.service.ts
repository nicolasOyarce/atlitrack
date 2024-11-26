import { UUID } from 'crypto';
import { ApiClient } from '../api-client';

export interface StudentSchedule {
    student_sportcenter_id:string;
    plan_name: string;
    discipline_name:string;
    day: string;
    hour_start: string;
    hour_end: string;
    trainer: string;
}

export const studentScheduleService = new ApiClient<StudentSchedule>('/student/schedule');

export interface ScheduleStudent {
    student_sportcenter_id:number;
    date: string;
    time: string;
}

export const scheduleStudentService = new ApiClient<ScheduleStudent>('/student/schedule');

export interface ScheduleStudentHistorial {
    schedule_id:number;
    date: string;
    time: string;
    plan_name: string;
    discipline_name: string;
}

export const scheduleStudentHistorialService = new ApiClient<ScheduleStudentHistorial>('/student/schedule/historial');
