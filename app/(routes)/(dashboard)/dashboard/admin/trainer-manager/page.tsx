import { ButtonAddTrainer } from "./components/ButtonAddTrainer/ButtonAddTrainer";
import { TableTrainer } from "./components/TableTrainer/TableTrainer";

export default function TrainerManagerPage() {
    return (
        <div>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-center text-gray-800">Entrenadores</h1>
                <ButtonAddTrainer />
            </div>
            <div>
                <div className="mt-10">
                    <TableTrainer />
                </div>
            </div>
        </div>
    )
}