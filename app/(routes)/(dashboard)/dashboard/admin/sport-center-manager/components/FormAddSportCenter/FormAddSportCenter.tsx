"use client"

import React from 'react';
import { useForm } from "react-hook-form"
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

export function SportCenterForm() {
    const form = useForm<z.infer<typeof sportCenterFormSchema>>({
        resolver: zodResolver(sportCenterFormSchema),
        defaultValues: {
            sport_center_name: "",
            address: "",
            phone: 0,
            mail: "",
            open_hour: "",
            close_hour: "",
        },
    })
    
    const onSubmit = async (values: z.infer<typeof sportCenterFormSchema>) => {
        console.log(values)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="sport_center_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Centro Deportivo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del centro deportivo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dirección" {...field} />
                                </FormControl>
                                <FormMessage />
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
                                    <Input placeholder="Teléfono" {...field} />
                                </FormControl>
                                <FormMessage />
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
                                <FormMessage />
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
                                    <Input placeholder="HH:MM" {...field} />
                                </FormControl>
                                <FormMessage />
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
                                    <Input placeholder="HH:MM" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Enviar</Button>
            </form>
        </Form>
    )
}