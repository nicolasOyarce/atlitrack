import { ButtonAddDiscipline } from "./components/ButtonAddStudent";
import { TableDiscipline } from "./components/TableStudent/TableStudent";

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