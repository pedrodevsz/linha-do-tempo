import TaskItem from "@tiptap/extension-task-item";

export const CustomTaskItem = TaskItem.extend({
    name: "taskItem",

    addAttributes() {
        return {
            checked: {
                default: false,
                parseHTML: (el: HTMLElement) => el.getAttribute("data-checked") === "true",
                renderHTML: (attrs: { checked: boolean }) =>
                    attrs.checked ? { "data-checked": "true" } : {},
            },
        };
    },

    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
        return ["li", HTMLAttributes, 0];
    },
});
