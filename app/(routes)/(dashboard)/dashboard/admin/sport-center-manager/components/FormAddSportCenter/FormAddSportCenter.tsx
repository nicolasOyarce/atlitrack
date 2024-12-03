"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { sportCenterFormSchema } from "./FormAddSportCenter.form";
import { CitiesOptions, communes } from "@/constants/selectOptions";
import { TimeSelector } from "@/components/ui/TimeSelector";
import { useSportCenters } from "@/hooks/useSportCenters";

type TimeValue = {
  hour: string;
  minute: string;
};

type SportCenter = {
    sport_center_id: number;
    sport_center_name: string;
    city_id: number;
    comuna_id: number;
    address: string;
    phone: number;
    mail: string;
    open_hour: string;
    close_hour: string;
};

export function SportCenterForm({ editingId, setEditingId, setOpenDialog }: { editingId: number | null, setEditingId: React.Dispatch<React.SetStateAction<number | null>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { sportCenters, isLoading, createSportCenter, updateSportCenter, deleteSportCenter } = useSportCenters();
    const [selectedCity, setSelectedCity] = useState<number | null>(null);
    const [openHour, setOpenHour] = useState<TimeValue>({ hour: "", minute: "" });
    const [closeHour, setCloseHour] = useState<TimeValue>({ hour: "", minute: "" });

  const form = useForm<z.infer<typeof sportCenterFormSchema>>({
    resolver: zodResolver(sportCenterFormSchema),
    defaultValues: {
      sport_center_name: "",
      city_id: 0,
      comuna_id: 0,
      address: "",
      phone: "",
      mail: "",
      open_hour: "",
      close_hour: "",
    },
  });
  const parseTime = (time: string): TimeValue => {
    const [hour, minute] = time.split(":");
    return { hour, minute };
};
    useEffect(() => {
      if (editingId) {
        console.log('Editing sport center with ID:', editingId);
        
        const sportCenter = sportCenters.find((sc: SportCenter) => sc.sport_center_id === editingId); 
        if (sportCenter) {
            // Populate the form fields with the existing sport center data
            const selectedCity = CitiesOptions.find((city) => city.label === sportCenter.city_name);
            const selectedComuna = communes.find((commune) => commune.name === sportCenter.comuna_name);

            form.reset({
                sport_center_name: sportCenter.sport_center_name,
                city_id: selectedCity?.value || 0,
                comuna_id: selectedComuna?.id || 0,
                address: sportCenter.address,
                phone: sportCenter.phone.toString(),
                mail: sportCenter.mail,
                open_hour: sportCenter.open_hour,
                close_hour: sportCenter.close_hour,
            });
    
            // Set the open and close hour values
            //setSelectedComuna(sportCenter.comuna_name)
            setSelectedCity(selectedCity?.value || null);
            setOpenHour(parseTime(sportCenter.open_hour));
            setCloseHour(parseTime(sportCenter.close_hour));
        }
        }
      }, [editingId, sportCenters, form]);

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
      const filteredCommunes = (editingId || selectedCity)
      ? communes.filter((commune) => commune.cityId === selectedCity).map((commune) => ({
          value: commune.id,
          label: commune.name,
        }))
      : [];

    const onSubmit = async (values: z.infer<typeof sportCenterFormSchema>) => {
        try {
        if (editingId) {
            await updateSportCenter({ id: editingId, data: values });
            
            setEditingId(null);
        } else {
            await createSportCenter(values);
        }
        setOpenDialog(false)
        form.reset();
        } catch (error) {
        console.error("Error:", error);
        }
    };

    const handleEdit = (sportCenter: SportCenter) => {
        setEditingId(sportCenter.sport_center_id);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de eliminar este centro deportivo?")) {
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
                      console.log('City changed to:', cityId);
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

          {/* Select para Comuna */}
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
                    // Disable the comuna select only if we're not in editing mode and no city is selected
                    disabled={!editingId && !selectedCity}
                    onChange={(e) => {
                    const comunaId = e.target.value ? Number(e.target.value) : null;
                    console.log('Comuna changed to:', comunaId);
                    field.onChange(comunaId);
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
                    placeholder="9 89898989"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                  />
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
                  <Input placeholder="Correo electrónico" {...field} />
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
        <div className="space-x-4">
          <Button type="submit" className="w-full lg:w-auto bg-green-500">
            {editingId ? "Actualizar Centro" : "Crear Centro"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
