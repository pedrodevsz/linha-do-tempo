import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

export function MenuGroup({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title={label}>
                    {icon}
                    <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="center" sideOffset={6} className="w-auto p-2">
                {children}
            </PopoverContent>
        </Popover>
    );
}