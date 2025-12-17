"use client"

import React, { useState } from 'react';
import { Program, Subject } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Terminal, Copy, Check, Play, X, Sparkles, BrainCircuit, Loader2, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { generateVivaQuestions } from '@/ai/flows/viva-questions-flow';
import type { VivaQuestion } from '@/ai/flows/viva-questions-types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type ProgramDetailClientProps = {
    program: Program;
    subject?: Subject;
};

const subjectColorClasses: Record<string, string> = {
    ai: "bg-subject-ai/10 text-subject-ai border-subject-ai/20",
    fsd: "bg-subject-fsd/10 text-subject-fsd border-subject-fsd/20",
    cn: "bg-subject-cn/10 text-subject-cn border-subject-cn/20",
    tinkering: "bg-subject-tinkering/10 text-subject-tinkering/20",
};

export function ProgramDetailClient({ program, subject }: ProgramDetailClientProps) {
    const [isRunModalOpen, setIsRunModalOpen] = useState(false);
    const [isVivaModalOpen, setIsVivaModalOpen] = useState(false);
    const [vivaQuestions, setVivaQuestions] = useState<VivaQuestion[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const { isCopied, copy } = useCopyToClipboard();
    const { toast } = useToast();

    const handleCopy = () => {
        copy(program.code);
        toast({
            title: "Copied to clipboard!",
            description: "The code has been successfully copied.",
        });
    };

    const handleGenerateViva = async () => {
        setIsVivaModalOpen(true);
        if (vivaQuestions.length > 0) return;

        setIsGenerating(true);
        try {
            const result = await generateVivaQuestions({ code: program.code, aim: program.aim });
            setVivaQuestions(result.questions);
        } catch (error) {
            console.error("Failed to generate viva questions:", error);
            toast({
                variant: "destructive",
                title: "AI Error",
                description: "Could not generate viva questions at this time.",
            });
            setIsVivaModalOpen(false);
        } finally {
            setIsGenerating(false);
        }
    };


    return (
        <>
            <Card className="overflow-hidden rounded-2xl border">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {subject && (
                                <Badge className={cn("font-semibold", subjectColorClasses[subject.color])}>
                                    {subject.shortTitle}
                                </Badge>
                            )}
                            <Badge variant="outline">{program.language}</Badge>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleGenerateViva}>
                            <Sparkles className="mr-2 h-4 w-4 text-primary" />
                            Generate Viva Questions
                        </Button>
                    </div>
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{program.title}</h1>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {program.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="p-6">
                    <h2 className="flex items-center text-lg font-semibold">
                        <Terminal className="mr-3 h-5 w-5 text-muted-foreground" />
                        Problem / Aim
                    </h2>
                    <p className="mt-3 text-muted-foreground prose dark:prose-invert max-w-none">{program.aim}</p>
                </div>

                <Separator />

                <div className="p-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <h2 className="text-lg font-semibold">Code</h2>
                        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
                            <Button variant="secondary" onClick={handleCopy} className="w-full sm:w-auto">
                                {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                                {isCopied ? 'Copied!' : 'Copy Code'}
                            </Button>
                            {program.canRunInBrowser && (
                                <Button onClick={() => setIsRunModalOpen(true)} className="w-full sm:w-auto">
                                    <Play className="mr-2 h-4 w-4" />
                                    Run
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-code-bg p-4 font-code">
                        <div className="mb-2 flex items-center gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <pre className="overflow-x-auto py-2 text-sm text-white/80"><code>{program.code}</code></pre>
                    </div>

                    {!program.canRunInBrowser && (
                        <p className="mt-3 text-sm italic text-muted-foreground">
                            This program cannot be run in a local {program.language} environment.
                        </p>
                    )}
                </div>
            </Card>
            
            <Dialog open={isRunModalOpen} onOpenChange={setIsRunModalOpen}>
                <DialogContent className="max-w-5xl h-[80vh] p-0 animate-scale-in">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle>Run: {program.title}</DialogTitle>
                         <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state-open]:text-muted-foreground">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </DialogHeader>
                    <div className="h-full w-full">
                        <iframe
                          srcDoc={program.code}
                          title="Code Runner"
                          sandbox="allow-scripts allow-modals"
                          className="h-full w-full border-0"
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isVivaModalOpen} onOpenChange={setIsVivaModalOpen}>
                <DialogContent className="max-w-3xl animate-scale-in">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <BrainCircuit className="h-6 w-6 text-primary" />
                            AI-Generated Viva Questions
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4 max-h-[70vh] overflow-y-auto">
                        {isGenerating ? (
                            <div className="flex flex-col items-center justify-center gap-4 text-center">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="font-semibold text-lg">AI is thinking...</p>
                                <p className="text-muted-foreground">Generating questions based on "{program.title}". Please wait a moment.</p>
                            </div>
                        ) : vivaQuestions.length > 0 ? (
                           <Accordion type="single" collapsible className="w-full">
                                {vivaQuestions.map((item, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger className="text-left hover:no-underline">
                                            <span className="font-semibold">{index + 1}. {item.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                                            <p>{item.answer}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                             <div className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground">
                                <Bot className="h-12 w-12" />
                                <p className="font-semibold text-lg">No questions generated yet.</p>
                                <p>Click the button again to try generating questions.</p>
                             </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
