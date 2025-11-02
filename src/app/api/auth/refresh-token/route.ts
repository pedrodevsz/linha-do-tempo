import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "@/lib/jwt";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const oldRefreshToken = cookieStore.get("refreshToken")?.value;

        if (!oldRefreshToken) {
            return NextResponse.json(
                { message: "Token de atualização ausente." },
                { status: 401 }
            );
        }

        let payload;
        try {
            payload = verifyRefreshToken(oldRefreshToken);
        } catch {
            return NextResponse.json(
                { message: "Token de atualização inválido ou expirado." },
                { status: 401 }
            );
        }

        const userId = payload.userId;
        if (!userId) {
            return NextResponse.json(
                { message: "Token de atualização inválido." },
                { status: 401 }
            );
        }

        const stored = await prisma.refreshToken.findUnique({
            where: { token: oldRefreshToken },
        });

        if (!stored) {
            return NextResponse.json(
                { message: "Token de atualização não encontrado ou revogado." },
                { status: 401 }
            );
        }

        const newAccessToken = generateAccessToken(userId);
        const newRefreshToken = generateRefreshToken(userId);

        await prisma.refreshToken.deleteMany({ where: { userId } });
        await prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        const response = NextResponse.json({
            success: true,
            accessToken: newAccessToken,
            message: "Token atualizado com sucesso.",
        });

        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return response;
    } catch (error) {
        console.error("Erro ao atualizar token:", error);
        return NextResponse.json(
            { message: "Erro interno ao atualizar token." },
            { status: 500 }
        );
    }
}
