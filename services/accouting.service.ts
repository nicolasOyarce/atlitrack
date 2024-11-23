import { UUID } from 'crypto';
import { ApiClient } from './api-client';

// Definimos el tipo para la respuesta de la API
export interface IncomeData {
    [key: string]: number; // Mes-Año: Ingreso
  }
  
  export interface AccoutingResponse {
    student_sportcenter_id: number;
    last_renewal_date: string; // Usamos string para la fecha, la convertiremos en Date luego
    price: number;
    plan_name: string;
    student: string;
    accouting_id: number;

  }
  

export const accoutingService = new ApiClient<AccoutingResponse>('/admin/accouting-revenue');

export interface AccoutingExpense {
    trainer: string;
    salary: number;
}

export const accoutingExpenseService = new ApiClient<AccoutingExpense>('/admin/accouting-expense');