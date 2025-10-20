import { AuthForm } from "@/components/auth/auth-form";
import { Lock } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="rounded-full bg-primary/10 p-3 ring-8 ring-primary/5">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-balance">Faça login</h1>
                    <p className="text-muted-foreground text-balance">Acesso seguro com criptografia</p>
                </div>

                <AuthForm mode="login" />
            </div>
        </div>
    );
}
