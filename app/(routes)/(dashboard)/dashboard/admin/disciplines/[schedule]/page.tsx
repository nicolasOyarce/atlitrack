"use client";

interface PageProps {
  params: {
    schedule: string
  }
}

import { ButtonAddScheduleDiscipline } from "./components/ButtonAddScheduleDiscipline";
import { TableScheduleDiscipline } from "./components/TableScheduleDiscipline";
export default function ScheduleDisciplinesPage({ params }: PageProps) {

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Horarios de Disciplinas</h2>
                <ButtonAddScheduleDiscipline schedule={params.schedule} />
            </div>
            <div>
                <div className="mt-20">
                    <TableScheduleDiscipline schedule={params.schedule} />
                </div>
            </div>
        </div>
    )
}