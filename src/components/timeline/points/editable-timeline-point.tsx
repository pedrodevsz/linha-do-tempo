"use client";

import * as React from "react";
import { useEditor } from "@tiptap/react";
import { Card } from "@/components/ui/card";
import { Milestone, Trash2Icon } from "lucide-react";

import { EditorContentWrapper } from "./menu/editor-content-wrapper";
import { FloatingMenu } from "./menu/floating-menu";
import { defaultExtensions } from "../extensions/tip-tap-extensions";
import { TaskItemNodeView } from "./menu/extensions/node-view";
import { Button } from "@/components/ui/button";
import { useTimelineStore } from "@/lib/store/use-timeline-store";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface EditableTimelinePointProps {
    id: string;
    content?: string;
    depth?: number;
    onUpdate?: (id: string, data: { title: string; content: string }) => void;
    timelineId: string
}

export function EditableTimelinePoint({
    id,
    content,
    depth = 0,
    timelineId
}: EditableTimelinePointProps) {
    const { removePoint } = useTimelineStore()

    const editor = useEditor({
        extensions: [
            ...defaultExtensions,
            TaskItemNodeView,
        ],
        content: '<p></p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
            },
        },
        immediatelyRender: false,
    });

    if (!editor) return null;

    const handleDelete = () => {
        if (timelineId) {
            removePoint(timelineId, id)
        }
    }

    return (
        <div
            style={{ marginLeft: depth * 24 }}
            className="relative group transition-all duration-300"
        >
            <div className="absolute -left-[34px] top-2 flex h-6 w-6 items-center justify-center text-primary">
                <Milestone className="h-5 w-5" />
            </div>

            <Card className="relative bg-card/60 backdrop-blur-md border border-primary/30 rounded-2xl shadow-md p-4">
                <div className="relative">
                    <FloatingMenu editor={editor} />
                    <EditorContentWrapper editor={editor} />
                </div>
                <div className="absolute top-2 right-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                variant="link"
                                onClick={handleDelete}
                                size="icon"
                                className="transition-transform duration-300 hover:scale-125 hover:rotate-6 active:scale-95"
                            >
                                <Trash2Icon className="text-red-500 hover:text-red-400 transition-colors"
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Excluir ponto</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </Card>
        </div>
    );
}
