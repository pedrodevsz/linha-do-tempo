"use client"
import { NodeViewWrapper, NodeViewContent, ReactNodeViewProps } from '@tiptap/react';
import { Checkbox } from '@/components/ui/checkbox';

export function TaskItemNode({ node, getPos, editor }: ReactNodeViewProps) {
    if (!getPos) return null;

    const checked = node.attrs.checked;

    const handleChange = (value: boolean) => {
        const pos = getPos();
        if (typeof pos !== 'number') return;

        editor.commands.command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, { ...node.attrs, checked: value });
            return true;
        });
    };

    return (
        <NodeViewWrapper className="flex items-center gap-2">
            <Checkbox checked={checked} onCheckedChange={handleChange} />
            <NodeViewContent className={`flex-1 ${checked ? 'line-through text-white/50' : ''}`} />
        </NodeViewWrapper>
    );
}
