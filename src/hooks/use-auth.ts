"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/use-auth-user-store";
import api from "@/lib/api";

export function useAuth() {
    const router = useRouter();
    const { user, loading, error, setUser, setLoading, setError } = useAuthStore();

    const verifySession = async () => {
        try {
            const res = await api.get("/auth/me");
            if (res.data?.user) {
                setUser(res.data.user);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await api.post("/auth/login", { email, password });
            setUser(res.data.user);

            // valida sessão e navega SPA
            const ok = await verifySession();
            if (ok) router.push("/dashboard");
            else setError("Falha ao autenticar.");
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao fazer login.");
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await api.post("/auth/register", { name, email, password });
            setUser(res.data.user);

            const ok = await verifySession();
            if (ok) router.push("/dashboard");
            else setError("Falha ao autenticar após cadastro.");
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao registrar usuário.");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await api.post("/auth/logout");
            setUser(null);
            router.push("/auth/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao sair da conta.");
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, login, register, logout, verifySession };
}
