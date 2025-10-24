"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { TimelineFormData, timelineSchema } from "../../lib/schemas/timelineSchema";

export function CreateTimelineModal({
    onSave,
    onClose,
}: {
    onSave: (timeline: TimelineFormData) => void;
    onClose: () => void;
}) {
    const form = useForm<TimelineFormData>({
        resolver: zodResolver(timelineSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    function onSubmit(data: TimelineFormData) {
        console.log(data)
        onSave(data);
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="bg-card/90 backdrop-blur-lg border border-border max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Criar Nova Timeline
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-2"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="title">Título</Label>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            placeholder="Ex: Projeto de Vida"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="description">Descrição</Label>
                                    <FormControl>
                                        <Input
                                            id="description"
                                            placeholder="Ex: Metas e marcos importantes"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end pt-4 gap-2">
                            <Button variant="outline" type="button" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit">Criar</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
