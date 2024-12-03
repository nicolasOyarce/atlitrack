'use client';

import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    formSchema,
    type FormValues,
    defaultValues,
    sportsCenters,
    categories,
    problems,
    content
} from './ContactForm.data';

export function ContactForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen py-12" id="home-contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative bg-gray-900 p-12 flex flex-col justify-center">
                            <div className="relative">
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    {content.hero.title}
                                </h2>
                                <p className="text-gray-300 text-lg">
                                    {content.hero.description}
                                </p>
                            </div>
                        </div>
                        <div className="p-12 bg-gray-950">
                            <h3 className="text-2xl font-bold text-white mb-8">
                                {content.form.title}
                            </h3>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{content.form.labels.firstName}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={content.form.placeholders.firstName} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{content.form.labels.lastName}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={content.form.placeholders.lastName} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{content.form.labels.email}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={content.form.placeholders.email} type="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="sportsCenter"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{content.form.labels.sportsCenter}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='text-gray-500'>
                                                            <SelectValue placeholder={content.form.placeholders.sportsCenter} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {sportsCenters.map((center) => (
                                                            <SelectItem key={center.value} value={center.value}>
                                                                {center.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{content.form.labels.category}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='text-gray-500'>
                                                            <SelectValue placeholder={content.form.placeholders.category} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map((category) => (
                                                            <SelectItem key={category.value} value={category.value}>
                                                                {category.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="problem"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{content.form.labels.problem}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='text-gray-500'>
                                                            <SelectValue placeholder={content.form.placeholders.problem} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {problems.map((problem) => (
                                                            <SelectItem key={problem.value} value={problem.value}>
                                                                {problem.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{content.form.labels.description}</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder={content.form.placeholders.description}
                                                        className="min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-900">
                                        {content.form.submitButton}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}