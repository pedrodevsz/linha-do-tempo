"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TimelineFormData } from "@/lib/schemas/timelineSchema";
import { PointData } from "@/lib/schemas/point-schema";

export type TimelinePoint = PointData & { id: string };

export type Timeline = {
    id: string;
    title: string;
    description?: string;
    points: TimelinePoint[];
};

type TimelineStore = {
    timelines: Timeline[];
    currentTimelineId: string | null;

    addTimeline: (data: TimelineFormData) => void;
    removeTimeline: (id: string) => void;
    selectTimeline: (id: string) => void;

    addPoint: (timelineId: string, point: PointData) => void;
    updatePoint: (timelineId: string, pointId: string, newData: Partial<PointData>) => void;
    removePoint: (timelineId: string, pointId: string) => void;
};

export const useTimelineStore = create<TimelineStore>()(
    persist(
        (set, get) => ({
            timelines: [],
            currentTimelineId: null,

            addTimeline: (data) => {
                const newTimeline: Timeline = {
                    id: crypto.randomUUID(),
                    title: data.title,
                    description: data.description,
                    points: [],
                };

                set((state) => ({
                    timelines: [...state.timelines, newTimeline],
                    currentTimelineId: newTimeline.id,
                }));
            },

            removeTimeline: (id) => {
                set((state) => ({
                    timelines: state.timelines.filter((t) => t.id !== id),
                }));
            },

            selectTimeline: (id) => {
                set({ currentTimelineId: id });
            },

            addPoint: (timelineId, point: PointData) => {
                const newPoint: TimelinePoint = { ...point, id: crypto.randomUUID() };

                set((state) => ({
                    timelines: state.timelines.map((t) =>
                        t.id === timelineId ? { ...t, points: [...t.points, newPoint] } : t
                    ),
                }));
            },

            updatePoint: (timelineId, pointId: string, newData: Partial<PointData>) => {
                set((state) => ({
                    timelines: state.timelines.map((t) =>
                        t.id === timelineId
                            ? {
                                ...t,
                                points: t.points.map((p) =>
                                    p.id === pointId ? { ...p, ...newData } : p
                                ),
                            }
                            : t
                    ),
                }));
            },

            removePoint: (timelineId, pointId: string) => {
                set((state) => ({
                    timelines: state.timelines.map((t) =>
                        t.id === timelineId
                            ? { ...t, points: t.points.filter((p) => p.id !== pointId) }
                            : t
                    ),
                }));
            },
        }),
        { name: "timeline-storage" }
    )
);
