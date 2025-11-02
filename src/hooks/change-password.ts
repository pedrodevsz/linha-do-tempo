import api from "@/lib/api";
import { AxiosError } from "axios";

export interface ChangePasswordResponse {
    message: string;
    success?: boolean;
}

export async function changePassword(newPassword: string): Promise<ChangePasswordResponse> {
    try {
        const { data } = await api.post<ChangePasswordResponse>("/auth/change-password", {
            password: newPassword,
        });

        return data;
    } catch (error: unknown) {
        if (error && typeof error === "object" && "isAxiosError" in error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            const message =
                axiosError.response?.data?.message ||
                axiosError.message ||
                "Erro ao alterar senha.";
            throw new Error(message);
        }

        throw new Error("Erro inesperado ao alterar senha.");
    }
}
