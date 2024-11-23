import Calendar from "./components/Calendar";

export default function SchedulePage() {
    return (
        <div>
                <div className="">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                Agenda
                </h1>
                    <Calendar />
                </div>
            </div>
    )
}