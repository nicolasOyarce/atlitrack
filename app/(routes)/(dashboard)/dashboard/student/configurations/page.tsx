"use client"
import { Button } from '@/components/ui/button'
import { AdminForm}  from './components/FormAdmin/FormStudent'
import { PlusCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

const ConfigurationStudentPage = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const toggleEdit = () => {
        if (editingId) {
          setEditingId(null); // Si ya estamos editando, lo desactivamos
        } else {
          setEditingId("editing"); // Un valor arbitrario para indicar que estamos en modo de edición
        }
      };
    
return (
        <>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-center text-gray-800">Configuraciones</h1>
            <Button 
              variant="outline" 
              onClick={toggleEdit} // Cambiar la lógica aquí para alternar entre editar y cancelar
              className={`flex items-center px-4 py-2 border border-1 rounded-md font-semibold transition-colors duration-300 hover:text-white
                ${editingId ? 'bg-red-500 hover:bg-red-400 text-white ' : 'bg-blue-500 hover:bg-blue-400 text-white'}`}
            >
              {editingId ? (
                    <>
                    Cancelar
                    <XCircle className="ml-1" /> {/* Icono para "Cancelar" */}
                    </>
                ) : (
                    <>
                    Editar Perfil
                    <PlusCircle className="ml-1" /> {/* Icono para "Editar Perfil" */}
                    </>
                )}
            </Button>
          </div>
    
          <div>
            <AdminForm 
              editingId={editingId} // Pasamos el estado al formulario
              setEditingId={setEditingId} // Opcional, si necesitas actualizarlo desde el formulario
            />
          </div>
        </>
      );
    };
    

export default ConfigurationStudentPage
