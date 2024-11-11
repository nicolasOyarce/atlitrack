import { useState } from "react";
import { Sportcenter } from "../types/sportcenter"
import { createSportcenter, getSportcenters } from '../services/sportcenter_api'

export function useCrud(){
    const [sportcenters, setSportcenters] = useState<Sportcenter[]>([]);

    const fetchSportCenters = async () => {
        const response = await getSportcenters();
        setSportcenters(response.data);
    };
    const addSportCenter = async (data: { sport_center_name: string;
        city_id: number;
        comuna_id: number;
        address: string;
        phone: number;
        mail: string;
        open_hour: string;
        close_hour: string }) => {
        await createSportcenter(data);
        fetchSportCenters();
    };

    return { sportcenters, fetchSportCenters, addSportCenter };
}
