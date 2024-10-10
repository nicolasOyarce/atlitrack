import { ButtonAddClass } from "./components/ButtonAddClass";

export default function ClassManagerPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="'text-2xl font-bold">Administrador de clases</h2>
                <ButtonAddClass />
            </div>
        </div>
    )
}