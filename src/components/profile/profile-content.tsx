"use client";

import { useState } from "react";
import { AboutUser } from "./about-user";
import { useRouter } from "next/navigation";

export function ProfileContent() {
    const [showEdit, setShowEdit] = useState(false);
    const router = useRouter()
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <AboutUser
                onEdit={() => setShowEdit(true)}
                onChangePassword={() => {
                    router.push("/auth/change-password")
                }}
            />
        </div>
    );
}
