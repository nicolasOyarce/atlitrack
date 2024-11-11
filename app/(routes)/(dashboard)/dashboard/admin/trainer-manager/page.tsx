import { ButtonAddTrainer } from "./components/ButtonAddTrainer/ButtonAddTrainer";
import { TableTrainer } from "./components/TableTrainer/TableTrainer";

export default function TrainerManagerPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Administrador de centros deportivos</h2>
                <ButtonAddTrainer />
            </div>
            <div>
                <div className="mt-20">
                    {/*<TableTrainer />*/}
                </div>
            </div>
        </div>
    )
}