"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardAction,
} from "@/components/ui/card"
import { Clock, Layers, Sparkles, ArrowRight } from "lucide-react"

export function Homepage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center space-y-14">
                    <div className="space-y-6">
                        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 ring-8 ring-primary/5">
                            <Clock className="h-12 w-12 text-primary" />
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight text-balance">
                            Crie sua Linha do Tempo Interativa
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Organize projetos, estudos e marcos importantes em uma linha do tempo visual e colaborativa.
                            Uma nova forma de acompanhar o progresso das suas ideias.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <Button asChild size="lg" className="text-base">
                                <Link href="/auth/register">
                                    Experimentar Agora
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                                <Link href="/auth/login">Entrar</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <Card className="backdrop-blur-sm bg-card/50 border-border/50 transition hover:shadow-md hover:border-primary/30">
                            <CardHeader className="flex flex-col gap-2">
                                <div className="rounded-full bg-primary/10 p-2 w-fit">
                                    <Layers className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Visual Estruturado</CardTitle>
                                        <CardDescription>
                                            Crie timelines com eventos, subpontos e descrições — tudo em um layout limpo e dinâmico.
                                        </CardDescription>
                                    </div>

                                </div>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <p className="text-sm text-muted-foreground">
                                    Personalize cada evento e subcategoria com ícones e cores únicas para facilitar a leitura visual.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="text-blue-500 px-0">
                                    <Link href="/auth/register">
                                        Saiba mais
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Card 2 */}
                        <Card className="backdrop-blur-sm bg-card/50 border-border/50 transition hover:shadow-md hover:border-primary/30">
                            <CardHeader className="flex flex-col gap-2">
                                <div className="rounded-full bg-primary/10 p-2 w-fit">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Interativo e Animado</CardTitle>
                                        <CardDescription>
                                            Adicione, edite e mova eventos em tempo real com animações suaves e uma experiência fluida.
                                        </CardDescription>
                                    </div>

                                </div>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <p className="text-sm text-muted-foreground">
                                    Tudo acontece com feedback visual instantâneo — criando uma experiência imersiva e moderna.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="text-blue-500 px-0">
                                    <Link href="/auth/register">
                                        Ver demonstração
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Card 3 */}
                        <Card className="backdrop-blur-sm bg-card/50 border-border/50 transition hover:shadow-md hover:border-primary/30">
                            <CardHeader className="flex flex-col gap-2">
                                <div className="rounded-full bg-primary/10 p-2 w-fit">
                                    <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Progresso e Histórico</CardTitle>
                                        <CardDescription>
                                            Acompanhe a evolução dos seus projetos, veja o que já foi concluído e o que vem a seguir.
                                        </CardDescription>
                                    </div>

                                </div>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <p className="text-sm text-muted-foreground">
                                    Visualize o passado, o presente e o futuro dos seus projetos com clareza e estilo.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className=" px-0 text-blue-500">
                                    <Link href="auth/register">
                                        Explorar recursos
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}
