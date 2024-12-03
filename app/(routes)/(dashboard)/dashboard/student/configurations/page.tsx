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
          setEditingId(null);
        } else {
          setEditingId("editing");
        }
      };
    
return (
        <>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-center text-slate-300">Configuraciones</h1>
            <Button 
              variant="outline" 
              onClick={toggleEdit}
              className={`flex items-center px-4 py-2 border border-1 rounded-md font-semibold transition-colors duration-300 hover:text-white
                ${editingId ? 'bg-red-500 hover:bg-red-400 text-white ' : 'bg-gray-700 hover:bg-gray-200 text-white hover:text-black'}`}
            >
              {editingId ? (
                    <>
                    Cancelar
                    <XCircle className="ml-1" />
                    </>
                ) : (
                    <>
                    Editar Perfil
                    <PlusCircle className="ml-1" />
                    </>
                )}
            </Button>
          </div>
    
          <div>
            <AdminForm 
              editingId={editingId} 
              setEditingId={setEditingId} 
            />
          </div>
        </>
      );
    };
    

export default ConfigurationStudentPage
