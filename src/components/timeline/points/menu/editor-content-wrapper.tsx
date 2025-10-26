"use client";

import * as React from "react";
import { EditorContent } from "@tiptap/react";

interface EditorContentWrapperProps {
    editor: any;
}

export function EditorContentWrapper({ editor }: EditorContentWrapperProps) {
    if (!editor) return null;

    return (
        <EditorContent
            editor={editor}
            className="
        prose prose-invert max-w-none focus:outline-none
        [&>*]:outline-none [&>*]:ring-0
        [&_p]:text-base [&_p]:text-white/90
        [&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:pl-0
        [&_li[data-type='taskItem']]:flex [&_li[data-type='taskItem']]:items-center [&_li[data-type='taskItem']]:gap-2
        [&_li[data-type='taskItem'][data-checked='true']_p]:line-through [&_li[data-type='taskItem'][data-checked='true']_p]:text-white/50
      "
        />
    );
}
