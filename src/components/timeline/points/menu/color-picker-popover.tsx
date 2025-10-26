import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Palette } from "lucide-react";

export function ColorPickerPopover({
    colors,
    current,
    onSelect,
}: {
    colors: string[];
    current: string;
    onSelect: (color: string) => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    title="Cor do texto"
                >
                    <Palette className="w-4 h-4" style={{ color: current }} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align="center"
                sideOffset={6}
                className="flex gap-2 p-2 flex-wrap max-w-[160px] justify-center"
            >
                {colors.map((color) => (
                    <button
                        key={color}
                        className={`w-6 h-6 rounded-full border-2 ${color === current ? "border-primary scale-110" : "border-gray-500"
                            } hover:scale-110 transition-transform`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSelect(color)}
                    />
                ))}
            </PopoverContent>
        </Popover>
    );
}
