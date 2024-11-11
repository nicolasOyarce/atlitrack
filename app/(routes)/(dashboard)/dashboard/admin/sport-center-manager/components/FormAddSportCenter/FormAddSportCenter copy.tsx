"use client"

import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFormContext } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { sportCenterFormSchema } from "./FormAddSportCenter.form"; 
import { CitiesOptions, communes } from '@/constants/selectOptions';
import { TimeSelector } from '@/components/ui/TimeSelector'
import { useCrud } from '@/hooks/useCrud';
import { SportCenter } from '@/services/sport_center.service';
import { useSportCenters } from '@/hooks/useSportCenters';

type TimeValue = {
    hour: string;
    minute: string;
  };

export function SportCenterForm() {
    console.log('Renderizando SportCentersPage');
    useEffect(() => {
        console.log('SportCentersPage mounted');
        
        // Verificar token
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='));
        console.log('Token en cookie:', token);
      }, []);
    const [selectedCity, setSelectedCity] = useState<number | null>(null);
    const [openHour, setOpenHour] = useState<TimeValue>({ hour: '', minute: '' });
    const [closeHour, setCloseHour] = useState<TimeValue>({ hour: '', minute: '' });
    const {
        sportCenters,
        isLoading,
        createSportCenter,
        updateSportCenter,
        deleteSportCenter
      } = useSportCenters();

    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm<z.infer<typeof sportCenterFormSchema>>({
        resolver: zodResolver(sportCenterFormSchema),
        defaultValues: {
            sport_center_name: "",
            city_id: 0,
            comuna_id:0,
            address: "",
            phone: "",
            mail: "",
            open_hour: "",
            close_hour: "",
        },
    });
    
    const formatTime = (time: { hour: string; minute: string }): string => {
        return `${time.hour}:${time.minute}`;
    };
    const handleTimeOpenChange = (newValue: { hour: string; minute: string }) => {
        setOpenHour(newValue);
        form.setValue("open_hour", formatTime(newValue)); 
    };

    const handleTimeCloseChange = (newValue: { hour: string; minute: string }) => {
        setCloseHour(newValue);
        form.setValue("close_hour", formatTime(newValue)); 
    };
    // Función para selecionar ciudad y filtrar comunas por ciudad seleccionada


    const filteredCommunes = selectedCity
    ? communes.filter((commune) => commune.cityId === selectedCity).map((commune) => ({
          value: commune.id,
          label: commune.name,
      }))
    : [];
    const onSubmit = async (values: z.infer<typeof sportCenterFormSchema>) => {
        try {
            console.log('Intentando submit con valores:', values);
            if (editingId) {
                await updateSportCenter({ id: editingId, data: values });
                console.log('Actualizando ID:', editingId);
                setEditingId(null);
            } else {
                console.log('Creando nuevo registro');  
                await createSportCenter(values);
            }
            console.log('Operación exitosa');
            form.reset();
          } catch (error) {
            console.error('Error:', error);
          }
        };
        {/*}
        try {
            console.log("Form submitted");
            console.log(values);
        } catch (error) {
            console.error("Error en el submit:", error);
        }
            */}
    const handleEdit = (sportCenter: SportCenter) => {
        setEditingId(sportCenter.id);
        form.reset({
            sport_center_name: sportCenter.sport_center_name,
        });
        };
    
        const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este centro deportivo?')) {
            await deleteSportCenter(id);
        }
        };
    
        if (isLoading) return <div>Cargando...</div>;

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="sport_center_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Centro deportivo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del centro deportivo" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                        <Controller
                            name="city_id"
                            control={form.control}
                            render={({ field }) => (
                                <FormControl>
                                    <select
                                        {...field}
                                        className="at-input"
                                        onChange={(e) => {
                                            const cityId = e.target.value ? Number(e.target.value) : null;
                                            setSelectedCity(cityId);
                                            field.onChange(cityId); // Actualiza el valor en el formulario
                                        }}
                                    >
                                        <option value="">Selecciona una ciudad</option>
                                        {CitiesOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                            )}
                        />
                    </FormItem>

                {/* Select para Comuna, que se actualiza según la ciudad seleccionada */}
                    <FormItem>
                    <FormLabel>Comuna</FormLabel>
                    <Controller
                        name="comuna_id"
                        control={form.control}
                        render={({ field }) => (
                            <FormControl>
                                <select
                                    {...field}
                                    className="at-input"
                                    disabled={!selectedCity} // Deshabilita si no hay ciudad seleccionada
                                    onChange={(e) => {
                                        const value = e.target.value ? Number(e.target.value) : undefined; // Convertir a número o undefined
                                        console.log("Comuna seleccionada:", value);
                                        field.onChange(value); // Actualiza el valor de la comuna en el formulario
                                    }}
                                    >
                                    <option value="">Selecciona una comuna</option>
                                    {filteredCommunes.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                        )}
                    />
                    </FormItem>
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dirección" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="9 89898989" {...field} 
                                        value={field.value || ''} // Asegúrate de que esté vacío si el campo no tiene valor
                                        onChange={(e) => {
                                        // Filtra solo los números al ingresar
                                        field.onChange(e.target.value.replace(/\D/g, ''));
                                        }}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="mail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input placeholder="Correo electrónico" {...field} 
                                    />
                                    
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="open_hour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hora de Apertura</FormLabel>
                                <FormControl>
                                <TimeSelector
                                    name=""
                                    value={openHour}
                                    onChange={handleTimeOpenChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                

                    <FormField
                        control={form.control}
                        name="close_hour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hora de Cierre</FormLabel>
                                <FormControl>
                                <TimeSelector
                                    name=""
                                    value={closeHour}
                                    onChange={handleTimeCloseChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Enviar</Button>
            </form>
        </Form>
        
    )
}