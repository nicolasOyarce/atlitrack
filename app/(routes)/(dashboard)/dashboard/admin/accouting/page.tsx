"use client"

import { Fragment, useEffect, useState } from "react";
import { IncomeData, AccoutingResponse, AccoutingExpense } from "@/services/accouting.service"; // Los tipos que definimos anteriormente
import { useAccouting } from "@/hooks/useAccouting"; // Importamos el hook customizado

export default function Home() {
    const { accoutings,expenses, isLoading, isError, error } = useAccouting(); // Usamos el hook para obtener los datos
    const [incomeData, setIncomeData] = useState<IncomeData>({}); // Estado para guardar los ingresos agrupados por mes y año
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null); // Estado para controlar qué fila está expandida
    const [expandedDetails, setExpandedDetails] = useState<AccoutingResponse[] | null>(null); // Estado para guardar los detalles de las entradas expandidas

    const [totalSalary, setTotalSalary] = useState(0); // Para guardar el total de salarios
    const [trainerCount, setTrainerCount] = useState(0); // Para contar el número de entrenadores
    const [expandedTrainer, setExpandedTrainer] = useState<string | null>(null); // Estado para controlar qué fila está expandida
    const [expandedTrainerDetails, setExpandedTrainerDetails] = useState<AccoutingExpense | null>(null); // Detalles del entrenador
    const [isExpanded, setIsExpanded] = useState(false); // Controla si se expanden los detalles de los entrenadores
    
    // Procesamos los datos de accoutings para agrupar por mes y año
    useEffect(() => {
      if (accoutings.length > 0) {
        const groupedIncome: IncomeData = {};
  
        accoutings.forEach((entry: AccoutingResponse) => {
          const dateObj = new Date(entry.last_renewal_date); // Convertimos la fecha en Date
          const price = entry.price;
          const yearMonth = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`; // Formato 'YYYY-MM'
  
          // Sumamos los precios por mes y año
          if (groupedIncome[yearMonth]) {
            groupedIncome[yearMonth] += price;
          } else {
            groupedIncome[yearMonth] = price;
          }
        });
  
        setIncomeData(groupedIncome); // Actualizamos el estado con los ingresos agrupados
      }
    }, [accoutings]); // Ejecutamos cuando accoutings cambia
    useEffect(() => {
        if (expenses.length > 0) {
          const total = expenses.reduce((sum, expense) => sum + expense.salary, 0);
          setTotalSalary(total);
          setTrainerCount(expenses.length);
        }
      }, [expenses]); // Ejecutamos cuando expenses cambia
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error: {error?.message}</div>;
    }
  
    // Función para manejar el clic en una fila
    const handleRowClick = (monthYear: string) => {
      if (expandedMonth === monthYear) {
        setExpandedMonth(null); // Colapsar si ya está expandido
        setExpandedDetails(null); // Limpiar detalles al colapsar
      } else {
        setExpandedMonth(monthYear); // Expandir la fila
        // Filtrar las entradas correspondientes al mes/año seleccionado
        const details = accoutings.filter(
          (entry) =>
            `${new Date(entry.last_renewal_date).getFullYear()}-${(
              new Date(entry.last_renewal_date).getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}` === monthYear
        );
        setExpandedDetails(details); // Guardamos los detalles de las entradas seleccionadas
      }
    };
    const handleTrainerClick = (trainerName) => {
        if (expandedTrainer === trainerName) {
          // Si ya está expandido, lo colapsamos
          setExpandedTrainer(null);
          setExpandedTrainerDetails(null);
        } else {
          // Si no está expandido, lo expandimos
          setExpandedTrainer(trainerName);
          const trainerDetails = expenses.find((expense) => expense.trainer === trainerName);
          setExpandedTrainerDetails(trainerDetails);
        }
      };
      const handleSummaryClick = () => {
        setIsExpanded(!isExpanded); // Alterna el estado de expansión
      };
    return (
        <>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Resumen de Ingresos</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">Mes y Año</th>
                <th className="px-4 py-2 border border-gray-300">Ingreso Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(incomeData).length > 0 ? (
                Object.entries(incomeData).map(([monthYear, amount]) => (
                  <Fragment key={monthYear}>
                    {/* Fila principal */}
                    <tr
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(monthYear)} // Manejamos el clic
                    >
                      <td className="px-4 py-2 border border-gray-300">{monthYear}</td>
                      <td className="px-4 py-2 border border-gray-300 text-right">
                        ${amount.toLocaleString()}
                      </td>
                    </tr>
  
                    {/* Detalle expandido */}
                    {expandedMonth === monthYear && expandedDetails && (
                      <tr className="bg-gray-200">
                        <td colSpan={2} className="px-4 py-4">
                          <div className="text-lg">
                            <h3 className="font-semibold">Detalles de Ingresos:</h3>
                            {expandedDetails.map((detail, idx) => (
                              <div key={idx} className="my-4">
                                <p><strong>Estudiante:</strong> {detail.student}</p>
                                <p><strong>Fecha de Renovación:</strong> {new Date(detail.last_renewal_date).toLocaleDateString()}</p>
                                <p><strong>Ingreso:</strong> ${detail.price.toLocaleString()}</p>
                                <p><strong>Plan:</strong> {detail.plan_name}</p>
                                
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-2 text-center">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Resumen de Egresos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">Cantidad de Entrenadores</th>
              <th className="px-4 py-2 border border-gray-300">Egreso Total</th>
            </tr>
          </thead>
          <tbody>
            {trainerCount > 0 ? (
              <Fragment>
                {/* Fila de resumen - Al hacer clic se expanden los detalles */}
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={handleSummaryClick} // Manejamos el clic en la fila de resumen
                >
                  <td className="px-4 py-2 border border-gray-300">{trainerCount}</td>
                  <td className="px-4 py-2 border border-gray-300 text-right text-red-500">
                    -${totalSalary.toLocaleString()}
                  </td>
                </tr>

                {/* Detalles de los entrenadores - Se muestran cuando isExpanded es true */}
                {isExpanded && expenses.map((expense) => (
                  <tr key={expense.trainer} className="bg-gray-200">
                    <td colSpan={2} className="px-4 py-4">
                      <div className="text-lg">
                        <h3 className="font-semibold">Detalles del Entrenador:</h3>
                        <p><strong>Nombre:</strong> {expense.trainer}</p>
                        <p><strong>Salario:</strong> ${expense.salary.toLocaleString()}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-2 text-center">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
      </>
    );
  }