import { ButtonAddStudent } from "./components/ButtonAddStudent";
import { TableSubscription } from "./components/TableStudent/TableStudent";

export default function DisciplinesPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Administrador de Alumnos</h2>
                <ButtonAddStudent />
            </div>
            <div>
                <div className="mt-20">
                    <TableSubscription />
                </div>
            </div>
        </div>
    )
}