import { ButtonAddDiscipline } from "./components/ButtonAddDiscipline";
import { TableDiscipline } from "./components/TableDiscipline/TableDiscipline";

export default function DisciplinesPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Administrador de Disciplinas</h2>
                <ButtonAddDiscipline />
            </div>
            <div>
                <div className="mt-20">
                    <TableDiscipline />
                </div>
            </div>
        </div>
    )
}