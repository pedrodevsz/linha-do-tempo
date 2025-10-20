"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/lib/schemas/auth-schemas";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type FormData = {
    name?: string;
    email: string;
    password: string;
};

interface AuthFormProps {
    mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
    const { login, register, error, loading } = useAuth();

    const form = useForm<FormData>({
        resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    const onSubmit = async (data: FormData) => {
        if (mode === "login") {
            await login(data.email!, data.password!);
        } else {
            await register(data.name!, data.email!, data.password!);
        }
    };

    return (
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    {mode === "login" ? "Bem-vindo de volta" : "Criar conta"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    {mode === "login"
                        ? "Entre com suas credenciais para acessar sua conta"
                        : "Preencha os dados abaixo para criar sua conta"}
                </CardDescription>
            </CardHeader>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onChange={() => form.getValues()}
            >
                <CardContent className="space-y-4">
                    {mode === "register" && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input {...form.register("name")} id="name" placeholder="Seu nome" disabled={loading} />
                            {form.formState.errors.name && (
                                <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
                            )}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input {...form.register("email")} id="email" placeholder="seu@email.com" disabled={loading} />
                        {form.formState.errors.email && (
                            <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input {...form.register("password")} id="password" type="password" placeholder="••••••••" disabled={loading} />
                        {form.formState.errors.password && (
                            <p className="text-destructive text-sm">{form.formState.errors.password.message}</p>
                        )}
                        {mode === "register" && <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>}
                    </div>

                    {error && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                            {error}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full my-4" disabled={loading}>
                        {loading ? (mode === "login" ? "Entrando..." : "Criando...") : mode === "login" ? "Entrar" : "Criar conta"}
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                        {mode === "login" ? "Não tem uma conta? " : "Já tem uma conta? "}
                        <Link
                            href={mode === "login" ? "/auth/register" : "/auth/login"}
                            className="text-primary hover:underline font-medium"
                        >
                            {mode === "login" ? "Criar conta" : "Fazer login"}
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card >
    );
}
