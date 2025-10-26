"use client";

import * as React from "react";
import { Editor } from "@tiptap/react";
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Highlighter,
    AlignLeft,
    AlignCenter,
    AlignRight,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorPickerPopover } from "./color-picker-popover";
import { COLORS } from "./colors";

interface FloatingMenuProps {
    editor: Editor;
}

export function FloatingMenu({ editor }: FloatingMenuProps) {
    const [visible, setVisible] = React.useState(false);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const [currentColor, setCurrentColor] = React.useState("#ffffff");
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!editor) return;

        const updateMenu = () => {
            const { selection } = editor.state;
            if (!selection || selection.empty) {
                setVisible(false);
                return;
            }

            const from = selection.from;
            const coords = editor.view.coordsAtPos(from);
            const editorRect = editor.view.dom.getBoundingClientRect();

            let left = coords.left - editorRect.left;
            if (menuRef.current) {
                const menuWidth = menuRef.current.offsetWidth;
                left = Math.min(Math.max(left, 8), editorRect.width - menuWidth - 8);
            }

            setPosition({
                top: coords.top - editorRect.top - 60,
                left,
            });

            setVisible(true);
        };

        editor.on("selectionUpdate", updateMenu);
        editor.on("transaction", updateMenu);

        return () => {
            editor.off("selectionUpdate", updateMenu);
            editor.off("transaction", updateMenu);
        };
    }, [editor]);

    if (!editor || !visible) return null;

    const applyColor = (color: string) => {
        setCurrentColor(color);
        editor.chain().focus().setColor(color).run();
    };

    const createButton = (
        icon: React.ReactNode,
        command: () => void,
        isActive: boolean,
        title: string
    ) => (
        <Button
            key={title}
            size="sm"
            variant={isActive ? "default" : "ghost"}
            onClick={command}
            title={title}
        >
            {icon}
        </Button>
    );

    return (
        <div
            ref={menuRef}
            className="absolute z-50 bg-card/95 backdrop-blur-lg border border-primary/30 rounded-xl shadow-lg p-2 flex items-center space-x-1 max-w-[calc(100vw-16px)]"
            style={{ top: position.top, left: position.left }}
        >
            {createButton(
                <Bold className="w-4 h-4" />,
                () => editor.chain().focus().toggleBold().run(),
                editor.isActive("bold"),
                "Negrito"
            )}
            {createButton(
                <Italic className="w-4 h-4" />,
                () => editor.chain().focus().toggleItalic().run(),
                editor.isActive("italic"),
                "Itálico"
            )}
            {createButton(
                <Strikethrough className="w-4 h-4" />,
                () => editor.chain().focus().toggleStrike().run(),
                editor.isActive("strike"),
                "Tachado"
            )}
            {createButton(
                <Code className="w-4 h-4" />,
                () => editor.chain().focus().toggleCode().run(),
                editor.isActive("code"),
                "Código"
            )}
            {createButton(
                <Highlighter className="w-4 h-4" />,
                () => editor.chain().focus().toggleHighlight().run(),
                editor.isActive("highlight"),
                "Destaque"
            )}

            <ColorPickerPopover colors={COLORS} current={currentColor} onSelect={applyColor} />

            {createButton(
                <AlignLeft className="w-4 h-4" />,
                () => editor.chain().focus().setTextAlign("left").run(),
                editor.isActive({ textAlign: "left" }),
                "Alinhar à Esquerda"
            )}
            {createButton(
                <AlignCenter className="w-4 h-4" />,
                () => editor.chain().focus().setTextAlign("center").run(),
                editor.isActive({ textAlign: "center" }),
                "Centralizar"
            )}
            {createButton(
                <AlignRight className="w-4 h-4" />,
                () => editor.chain().focus().setTextAlign("right").run(),
                editor.isActive({ textAlign: "right" }),
                "Alinhar à Direita"
            )}
        </div>
    );
}
