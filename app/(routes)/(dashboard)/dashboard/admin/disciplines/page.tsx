import { ButtonAddDiscipline } from "./components/ButtonAddDiscipline";
import { TableDiscipline } from "./components/TableDiscipline/TableDiscipline";

export default function DisciplinesPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-center text-gray-800">Disciplinas</h1>
                <ButtonAddDiscipline />
            </div>
            <div>
                <div className="mt-10">
                    <TableDiscipline />
                </div>
            </div>
        </div>
    )
}