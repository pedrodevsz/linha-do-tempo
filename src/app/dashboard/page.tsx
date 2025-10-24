import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import TimelinePage from "@/components/timeline/timeline-page";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) redirect("/auth/login");

    try {
        const payload = verifyAccessToken(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { name: true, email: true },
        });

        if (!user) redirect("/auth/login");

        return <TimelinePage />
    } catch {
        redirect("/auth/login");
    }
}
