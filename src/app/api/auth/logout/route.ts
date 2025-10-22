import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ message: "Logout realizado com sucesso." });

    res.cookies.set("access_token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // Expira imediatamente
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.cookies.set("refresh_token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return res;
}
