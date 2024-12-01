import { ButtonAddSportCenter } from "./components/ButtonAddSportCenter";
import { TableSportCenter } from "./components/TableSportCenter/TableSportCenter";

export default function SportCeneterManagerPage() {
    return (
        <div >
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-center text-gray-800">Mi Centro</h1>
                <ButtonAddSportCenter />
            </div>
            <div>
                <div className="mt-10">
                    <TableSportCenter />
                </div>
            </div>
        </div>
    )
}