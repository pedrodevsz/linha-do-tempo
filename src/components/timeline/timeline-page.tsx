"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TimelinePlaceholder } from "@/components/timeline/timeline-placeholder";
import { TimelineCard } from "@/components/timeline/timeline-card";
import { ProfileSection } from "@/components/ui/profile-section";
import { CreateTimelineModal } from "@/components/timeline/create-timeline-modal";
import { TimelineFormData } from "@/lib/schemas/timelineSchema";


import { useTimelineStore } from "@/lib/store/use-timeline-store";

export default function TimelinePage() {
    const { timelines, addTimeline } = useTimelineStore();
    const [showModal, setShowModal] = useState(false);
    const [view, setView] = useState<"timelines" | "profile">("timelines");

    const handleCreate = (timeline: TimelineFormData) => {
        addTimeline(timeline);
        setShowModal(false);
    };

    return (
        <div className="space-y-8">
            {view === "timelines" && (
                <section>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Minhas Timelines</h1>
                            <p className="text-muted-foreground text-sm">
                                Crie, edite e visualize suas linhas do tempo.
                            </p>
                        </div>
                        <Button onClick={() => setShowModal(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nova Timeline
                        </Button>
                    </div>

                    {timelines.length === 0 ? (
                        <TimelinePlaceholder />
                    ) : (
                        <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                            {timelines.map((t) => (
                                <TimelineCard
                                    key={t.id}
                                    id={t.id}
                                    title={t.title}
                                    description={t.description}
                                />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {view === "profile" && <ProfileSection />}

            {showModal && (
                <CreateTimelineModal
                    onSave={handleCreate}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
