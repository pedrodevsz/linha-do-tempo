import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { verifyRefreshToken } from "@/lib/jwt";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();

        if (!password) {
            return NextResponse.json(
                { message: "A nova senha deve ser preenchida." },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { message: "Usuário não autenticado." },
                { status: 401 }
            );
        }

        const payload = verifyRefreshToken(refreshToken);
        if (!payload || !payload.userId) {
            return NextResponse.json(
                { message: "Sessão inválida ou expirada." },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({ where: { id: payload.userId } });
        if (!user) {
            return NextResponse.json(
                { message: "Usuário não encontrado." },
                { status: 404 }
            );
        }

        const hashed = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashed },
        });

        await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

        return NextResponse.json({
            success: true,
            message: "Senha alterada com sucesso. Faça login novamente.",
        });
    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        return NextResponse.json(
            { message: "Erro interno ao alterar senha." },
            { status: 500 }
        );
    }
}
