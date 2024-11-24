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
                <h1 className="text-2xl font-bold text-center text-gray-800">Horarios de Disciplinas</h1>
                <ButtonAddScheduleDiscipline schedule={params.schedule} />
            </div>
            <div>
                <div className="mt-10">
                    <TableScheduleDiscipline schedule={params.schedule} />
                </div>
            </div>
        </div>
    )
}