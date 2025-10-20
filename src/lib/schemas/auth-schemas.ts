import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha mínima de 6 caracteres"),
});

export const registerSchema = z.object({
    name: z.string().min(2, "Digite seu nome"),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha mínima de 6 caracteres"),
});
