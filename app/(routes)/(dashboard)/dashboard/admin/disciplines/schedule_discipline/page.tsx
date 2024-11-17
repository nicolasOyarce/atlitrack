import { ButtonAddScheduleDiscipline } from "./components/ButtonAddScheduleDiscipline";
import { TableScheduleDiscipline } from "./components/TableScheduleDiscipline";
import { useRouter } from "next/router";
export default function ScheduleDisciplinesPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Horarios de Disciplinas</h2>
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