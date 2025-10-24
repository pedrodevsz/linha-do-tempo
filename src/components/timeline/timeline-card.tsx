"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function TimelineCard({
    id,
    title,
    description,
}: {
    id: string;
    title: string;
    description?: string;
}) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
                href={`/dashboard/timeline/${id}`}
                className="block rounded-xl border border-border bg-card/60 p-5 hover:bg-card/80 transition-all shadow-sm hover:shadow-primary/20 min-h-[120px]"
            >
                <div className="flex flex-col justify-between h-full">
                    <h3 className="font-semibold text-lg text-white">{title}</h3>

                    {description ? (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
                    ) : (
                        <div className="mt-1 h-[2.5rem]" />
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
