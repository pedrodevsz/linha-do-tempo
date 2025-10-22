import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const { user, accessToken, refreshToken } = await loginUser(email, password);

        const res = NextResponse.json({
            user: { id: user.id, name: user.name, email: user.email },
        });

        res.cookies.set("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 15,
            sameSite: "lax",
        });

        res.cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });

        return res;
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 401 });
    }
}
