"use client";

import { Sidebar } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <aside className="hidden md:flex">
                <Sidebar />
            </aside>

            <div className="md:hidden fixed top-4 left-4 z-50">
                <Sidebar mobile />
            </div>

            <main className="flex-1 overflow-y-auto p-6 ml-16 md:ml-16 lg:ml-64">
                {children}
            </main>
        </div>
    );
}
