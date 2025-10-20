export function ProfileSection() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-3"></div>
                <h2 className="text-xl font-semibold">Usuário Demo</h2>
                <p className="text-muted-foreground text-sm">demo@timeline.app</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                    <p className="text-lg font-semibold">3</p>
                    <p className="text-muted-foreground text-sm">Timelines</p>
                </div>
                <div>
                    <p className="text-lg font-semibold">24</p>
                    <p className="text-muted-foreground text-sm">Pontos</p>
                </div>
                <div>
                    <p className="text-lg font-semibold">82%</p>
                    <p className="text-muted-foreground text-sm">Progresso</p>
                </div>
            </div>
        </div>
    );
}
