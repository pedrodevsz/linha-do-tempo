"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditableTimelinePoint } from "./points/editable-timeline-point";
import { useTimelineStore } from "@/lib/store/use-timeline-store";
import { PointData } from "@/lib/schemas/point-schema";

export function TimelineView({ timelineId }: { timelineId: string }) {
    const { timelines, addPoint, updatePoint } = useTimelineStore();
    const timeline = timelines.find((t) => t.id === timelineId);
    const [isAdding, setIsAdding] = useState(false);

    function handleAddPoint() {
        if (!timeline) return;
        const newPoint: PointData = {
            title: "",
            content: "",
        };
        addPoint(timeline.id, newPoint);
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 300);
    }

    function handleUpdatePoint(
        id: string,
        data: { title: string; content: string }
    ) {
        if (!timeline) return;
        updatePoint(timeline.id, id, data);
    }

    return (
        <div className="relative mx-auto max-w-4xl px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        {timeline?.title || "Minha Timeline"}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {timeline?.description ||
                            "Visualize e adicione momentos marcantes ✨"}
                    </p>
                </div>
            </div>

            <div className="relative pl-8 border-l border-lilac-700/40">
                <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-lilac-500 via-lilac-400/50 to-transparent animate-pulse" />

                {!timeline || timeline.points.length === 0 ? (
                    <p className="text-muted-foreground text-sm mt-4 ml-4">
                        Nenhum ponto ainda. Comece adicionando o primeiro 🌙
                    </p>
                ) : (
                    <div className="space-y-8">
                        {timeline.points.map((point) => (
                            <EditableTimelinePoint
                                key={point.id}
                                id={point.id}
                                content={point.content}
                                onUpdate={handleUpdatePoint}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Button
                size="lg"
                className="fixed bottom-6 right-6 rounded-full bg-lilac-600 hover:bg-lilac-500 text-white shadow-[0_0_15px_rgba(192,132,252,0.4)] transition-transform hover:scale-105"
                onClick={handleAddPoint}
                disabled={isAdding}
            >
                <PlusCircle className="h-5 w-5 mr-2" />
                Novo Ponto
            </Button>
        </div>
    );
}
