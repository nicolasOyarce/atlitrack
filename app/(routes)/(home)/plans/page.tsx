import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React from "react";

interface Plan {
    title: string;
    price: string;
    features: string[];
    buttonText: string;
}

const Plans: React.FC = () => {
    const plans: Plan[] = [
        {
            title: "Básico",
            price: "$15.000/mes",
            features: [
                "Acceso limitado a 1 centro deportivo",
                "Soporte básico",
                "Gestión básica de usuarios",
            ],
            buttonText: "Contratar",
        },
        {
            title: "Profesional",
            price: "$21.000/mes",
            features: [
                "Acceso a 5 centros deportivos",
                "Soporte prioritario",
                "Gestión avanzada de usuarios",
                "Reportes mensuales",
            ],
            buttonText: "Contratar",
        },
        {
            title: "Empresarial",
            price: "$30.000/mes",
            features: [
                "Acceso ilimitado a centros deportivos",
                "Soporte 24/7",
                "Gestión completa de usuarios",
                "Reportes avanzados y personalizados",
                "Integración con APIs",
            ],
            buttonText: "Contratar",
        },
    ];

    return (
        <div className="bg-gray-950 min-h-screen px-4">
            <Navbar />
            <div className="max-w-7xl mx-auto text-center mb-60">
                <h1 className="text-4xl font-extrabold text-slate-300 mb-8 mt-14">
                    Planes de Contratación
                </h1>
                <p className="text-lg text-gray-400 mb-12">
                    Elige el plan que mejor se adapte a tus necesidades.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="bg-green-50 shadow-md rounded-lg p-6 border border-gray-200"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                {plan.title}
                            </h2>
                            <p className="text-3xl font-bold text-gray-900 mb-6">
                                {plan.price}
                            </p>
                            <ul className="mb-6">
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="text-gray-600 text-sm mb-2 flex items-center"
                                    >
                                        <span className="text-green-500 mr-2">✔</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-700 transition">
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Plans;
