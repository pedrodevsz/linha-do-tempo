import z from "zod";

export const formSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres.")
            .max(64, "A senha é muito longa."),
        repeatNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.repeatNewPassword, {
        message: "As senhas não coincidem.",
        path: ["repeatNewPassword"],
    });

export type FormValues = z.infer<typeof formSchema>;