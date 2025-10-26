import { Button } from "@/components/ui/button";

export function MenuButton({
    icon,
    label,
    active,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
}) {
    return (
        <Button
            size="sm"
            variant={active ? "default" : "ghost"}
            onClick={onClick}
            className={`h-8 w-8 p-0 ${active ? "bg-primary text-white" : ""}`}
            title={label}
        >
            {icon}
        </Button>
    );
}
