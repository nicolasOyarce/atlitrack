import { ButtonAddPlan } from "./components/ButtonAddPlan";
import { TablePlan } from "./components/TablePlan/TablePlan";

export default function PlansPage() {
    return (
        <div>
            <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-center text-gray-800">Planes</h1>
                <ButtonAddPlan />
            </div>
            <div>
                <div className="mt-10">
                    <TablePlan />
                </div>
            </div>
        </div>
    )
}