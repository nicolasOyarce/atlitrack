import { ButtonAddSportCenter } from "./components/ButtonAddDiscipline";
import { TableSportCenter } from "./components/TableDiscipline/TableDiscipline";

export default function DisciplinesPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Administrador de centros deportivos</h2>
                <ButtonAddSportCenter />
            </div>
            <div>
                <div className="mt-20">
                    <TableSportCenter />
                </div>
            </div>
        </div>
    )
}