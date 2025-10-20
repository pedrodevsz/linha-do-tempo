"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, User, Settings, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
    const [active, setActive] = useState("timelines");
    const [expanded, setExpanded] = useState(false);

    const MenuItems = (
        <div className="flex flex-col gap-1 mt-2">
            <Link href="/dashboard/">
                <SidebarItem
                    icon={<Clock className="h-5 w-5" />}
                    label="Minhas Timelines"
                    active={active === "timelines"}
                    onClick={() => setActive("timelines")}
                    expanded={expanded}
                />
            </Link>

            <Link href="/dashboard/profile">
                <SidebarItem
                    icon={<User className="h-5 w-5" />}
                    label="Perfil"
                    active={active === "profile"}
                    onClick={() => setActive("profile")}
                    expanded={expanded}
                />
            </Link>

            <Link href="/dashboard/configurations">
                <SidebarItem
                    icon={<Settings className="h-5 w-5" />}
                    label="Configurações"
                    active={active === "settings"}
                    disabled
                    expanded={expanded}
                />
            </Link>
        </div>
    );

    // Mobile Sidebar
    if (mobile) {
        return (
            <div className="md:hidden p-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 bg-neutral-900/95 backdrop-blur-lg">
                        <SheetHeader>
                            <SheetTitle className="text-xl font-bold text-white">Menu</SheetTitle>
                        </SheetHeader>
                        {MenuItems}
                    </SheetContent>
                </Sheet>
            </div>
        );
    }

    // Desktop Sidebar
    return (
        <div
            className={`group flex flex-col h-screen fixed top-0 left-0 border-r border-neutral-700
        bg-neutral-900/95 backdrop-blur-md overflow-hidden z-40
        transition-all duration-300 ease-in-out
        ${expanded ? "w-56" : "w-16"}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <div className="flex items-center justify-center h-16 px-4 border-b border-neutral-700">
                <h2
                    className={`text-xl font-bold text-white transition-all duration-300 origin-left
            ${expanded ? "opacity-100 scale-100" : "opacity-0 scale-95"} `}
                >
                    Dashboard
                </h2>
            </div>

            <nav className="flex-1 px-2 py-4">{MenuItems}</nav>
        </div>
    );
}

function SidebarItem({
    icon,
    label,
    active,
    onClick,
    disabled,
    expanded,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    expanded: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        w-full
        ${active ? "bg-gray-700 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${expanded ? "justify-start" : "justify-center"}`}
        >
            {icon}
            {expanded && (
                <span
                    className={`whitespace-nowrap transition-opacity duration-300 ease-in-out ${expanded ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {label}
                </span>
            )}
        </button>
    );
}
