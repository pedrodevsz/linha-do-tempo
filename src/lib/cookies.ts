import { NextResponse } from "next/server";

export async function setAuthCookies(
    res: NextResponse,
    accessToken: string,
    refreshToken: string
) {
    res.cookies.set({
        name: "access_token",
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 15,
    });

    res.cookies.set({
        name: "refresh_token",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
    });

    return res;
}

export async function clearAuthCookies(res: NextResponse) {
    res.cookies.delete("access_token");
    res.cookies.delete("refresh_token");
    return res;
}
