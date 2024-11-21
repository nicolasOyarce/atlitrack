import * as z from "zod";

// Schema de validación
export const formSchema = z.object({
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    sportsCenter: z.string().min(1, "Seleccione un centro deportivo"),
    category: z.string().min(1, "Seleccione una categoría"),
    problem: z.string().min(1, "Seleccione un tipo de problema"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
});

// Tipo para los valores del formulario
export type FormValues = z.infer<typeof formSchema>;

// Valores por defecto del formulario
export const defaultValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    sportsCenter: "",
    category: "",
    problem: "",
    description: "",
};

// Datos para los centros deportivos
export const sportsCenters = [
    { value: "centro1", label: "Centro Deportivo 1" },
    { value: "centro2", label: "Centro Deportivo 2" },
    { value: "centro3", label: "Centro Deportivo 3" },
];

// Datos para las categorías
export const categories = [
    { value: "general", label: "General" },
    { value: "instalaciones", label: "Instalaciones" },
    { value: "clases", label: "Clases" },
    { value: "membresia", label: "Membresía" },
];

// Datos para los tipos de problemas
export const problems = [
    { value: "consulta", label: "Consulta General" },
    { value: "queja", label: "Queja" },
    { value: "sugerencia", label: "Sugerencia" },
    { value: "tecnico", label: "Problema Técnico" },
];

// Datos para el contenido estático
export const content = {
    hero: {
        title: "¿Necesitas ayuda?",
        description: "Estamos aquí para escucharte y ayudarte con cualquier problema o consulta que tengas sobre nuestros servicios deportivos.",
    },
    form: {
        title: "Formulario de Contacto",
        submitButton: "Enviar Mensaje",
        placeholders: {
            firstName: "Tu nombre",
            lastName: "Tu apellido",
            email: "example@email.com",
            description: "Describe tu problema o consulta...",
            sportsCenter: "Selecciona un centro",
            category: "Selecciona una categoría",
            problem: "Selecciona el tipo de problema",
        },
        labels: {
            firstName: "Nombre",
            lastName: "Apellido",
            email: "Email",
            sportsCenter: "Centro Deportivo",
            category: "Categoría",
            problem: "Tipo de Problema",
            description: "Descripción",
        },
    },
};