import { ButtonAddScheduleDiscipline } from "./components/ButtonAddScheduleDiscipline";
import { TableScheduleDiscipline } from "./components/TableScheduleDiscipline";
import { useRouter } from "next/router";
export default function ScheduleDisciplinesPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-center text-gray-800">Horarios de Disciplinas</h1>
                <ButtonAddScheduleDiscipline />
            </div>
            <div>
                <div className="mt-20">
                    <TableScheduleDiscipline />
                </div>
            </div>
        </div>
    )
}