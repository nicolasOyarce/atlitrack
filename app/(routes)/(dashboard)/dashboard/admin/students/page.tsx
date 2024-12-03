import { ButtonAddStudent } from "./components/ButtonAddStudent";
import { TableSubscription } from "./components/TableStudent/TableStudent";

export default function StudentsPage() {
    return (
        <div>
            <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-center text-slate-300">Alumnos</h1>
                <ButtonAddStudent />
            </div>
            <div>
                <div className="mt-10">
                    <TableSubscription />
                </div>
            </div>
        </div>
    )
}