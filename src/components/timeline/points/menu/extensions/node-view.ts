import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { TaskItemNode } from '../task-item-node';

export const TaskItemNodeView = Node.create({
    name: 'taskItem',
    group: 'block',
    content: 'inline*',
    inline: false,
    atom: true,

    addNodeView() {
        return ReactNodeViewRenderer(TaskItemNode);
    },
});
