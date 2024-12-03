import { ButtonAddSportCenter } from "./components/ButtonAddSportCenter";
import { TableSportCenter } from "./components/TableSportCenter/TableSportCenter";

export default function SportCeneterManagerPage() {
    return (
        <div className="w-full h-full">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold text-center text-white">Mi Centro</h1>
                <ButtonAddSportCenter />
            </div>
            <div className="w-full">
                <TableSportCenter />
            </div>
        </div>
    );
}
