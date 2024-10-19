import { ButtonAddSportCenter } from "./components/ButtonAddSportCenter";

export default function SportCeneterManagerPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Administrador de centros deportivos</h2>
                <ButtonAddSportCenter />
            </div>
        </div>
    )
}