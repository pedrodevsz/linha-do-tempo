import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    try {
        const payload = verifyAccessToken(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, name: true, email: true },
        });
        return NextResponse.json({ user });
    } catch {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}
