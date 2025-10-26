"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useTimelineStore } from "@/lib/store/use-timeline-store";
import { TooltipContent, TooltipTrigger, Tooltip } from "../ui/tooltip";

export function TimelineCard({
    id,
    title,
    description,
}: {
    id: string;
    title: string;
    description?: string;
}) {
    const { removeTimeline } = useTimelineStore()
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="relative block g-card/60 p-5 hover:bg-card/80 transition-all shadow-sm hover:shadow-primary/20 min-h-[120px]">
                <Link href={`/dashboard/timeline/${id}`}>
                    <div className="flex flex-col justify-between h-full">
                        <h3 className="font-semibold text-lg text-white">{title}</h3>

                        {description ? (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {description}
                            </p>
                        ) : (
                            <div className="mt-1 h-[2.5rem]" />
                        )}
                    </div>
                </Link>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="absolute top-2 right-2">
                            <Button
                                variant="link"
                                className="transition-transform duration-300 hover:scale-125 hover:rotate-6 active:scale-95"
                                onClick={() => removeTimeline(id)}
                            >
                                <Trash2Icon
                                    size={20}
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                />
                            </Button>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p >Excluir timeline</p>
                    </TooltipContent>
                </Tooltip>
            </Card>
        </motion.div>
    );
}
