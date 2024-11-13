import { ButtonAddPlan } from "./components/ButtonAddPlan";
import { TablePlan } from "./components/TablePlan/TablePlan";

export default function DisciplinesPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Administrador de Planes</h2>
                <ButtonAddPlan />
            </div>
            <div>
                <div className="mt-20">
                    <TablePlan />
                </div>
            </div>
        </div>
    )
}