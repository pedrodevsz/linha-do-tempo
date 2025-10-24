import { TimelineView } from "@/components/timeline/timeline-view";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="p-6">
            <TimelineView timelineId={params.id} />
        </div>
    );
}
