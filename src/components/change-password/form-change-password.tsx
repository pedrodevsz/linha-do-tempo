"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formSchema, FormValues } from "../../lib/schemas/change-password-schema";
import { changePassword } from "@/hooks/change-password";



export function FormChangePassword() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            repeatNewPassword: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            setLoading(true);

            await changePassword(values.newPassword)
            router.push("/dashboard/profile")
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
                throw new Error(error.message || "Houve um erro ao alterar senha")
            } else {
                throw new Error("Erro inesperado ao alterar senha")
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-md mx-auto p-6 bg-neutral-900 border border-neutral-700 text-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Alterar senha</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nova senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Digite a nova senha"
                                        {...field}
                                        className="bg-neutral-800 border-neutral-700 text-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="repeatNewPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repita a nova senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Repita a nova senha"
                                        {...field}
                                        className="bg-neutral-800 border-neutral-700 text-white"
                                    />
                                </FormControl>
                                <FormDescription>As senhas devem ser iguais</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        variant="outline"
                        disabled={loading}
                        className="w-full mt-2"
                    >
                        {loading ? "Salvando..." : "Salvar senha"}
                    </Button>
                </form>
            </Form>
        </Card>
    );
}
