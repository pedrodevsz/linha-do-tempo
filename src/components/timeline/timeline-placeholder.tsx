import { Card, CardDescription, CardTitle } from "../ui/card";

export function TimelinePlaceholder() {
    return (
        <Card className="mt-10 text-center p-10 border border-dashed border-border rounded-lg bg-card/20">
            <CardTitle className="text-muted-foreground">Nenhuma timeline criada ainda.</CardTitle>
            <CardDescription className="text-sm mt-2 text-foreground/70">
                Clique em <span className="text-primary font-semibold">“Nova Timeline”</span> para começar.
            </CardDescription>
        </Card>
    );
}
