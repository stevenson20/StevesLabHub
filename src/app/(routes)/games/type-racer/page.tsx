
"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, Timer, Type, GaugeCircle } from 'lucide-react';
import { codeSnippets, type CodeSnippet } from './code-snippets';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const getRandomSnippet = (currentId?: number): CodeSnippet => {
    let snippet: CodeSnippet;
    do {
        snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    } while (snippet.id === currentId);
    return snippet;
};

const CodeDisplay = React.forwardRef<HTMLPreElement, { snippet: string; userInput: string }>(
  ({ snippet, userInput }, ref) => {
    return (
      <pre
        ref={ref}
        className="text-left text-sm md:text-base whitespace-pre-wrap font-code leading-relaxed"
      >
        {snippet.split('').map((char, index) => {
          let color = 'text-muted-foreground';
          let background = '';
          if (index < userInput.length) {
            if (char === userInput[index]) {
              color = 'text-foreground';
            } else {
              background = 'bg-red-500/20'; 
              if (char === ' ') {
                background = 'bg-red-500/50';
              }
            }
          }
          return (
            <span key={index} className={cn('transition-colors duration-100', color, background)}>
              {char}
            </span>
          );
        })}
      </pre>
    );
  }
);
CodeDisplay.displayName = "CodeDisplay";


export default function TypeRacerPage() {
    const [snippet, setSnippet] = useState<CodeSnippet>(getRandomSnippet());
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const codeDisplayRef = useRef<HTMLPreElement>(null);

    const resetGame = useCallback(() => {
        setSnippet(getRandomSnippet(snippet?.id));
        setUserInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(0);
        setIsFinished(false);
        inputRef.current?.focus();
    }, [snippet?.id]);
    
    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        if (!isFinished) {
            inputRef.current?.focus();
        }
    }, [isFinished]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (isFinished) return;

        if (!startTime && value.length > 0) {
            setStartTime(Date.now());
        }
        setUserInput(value);

        if (value.length >= snippet.code.length) {
            finishGame(value);
        }
    };
    
    const finishGame = (finalInput: string) => {
        if (!startTime) return;
        
        const finalValue = finalInput.slice(0, snippet.code.length);
        setUserInput(finalValue);
        
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000 / 60; // in minutes

        const words = snippet.code.length / 5;
        const calculatedWpm = Math.round(words / duration);
        setWpm(calculatedWpm > 0 ? calculatedWpm : 0);

        let correctChars = 0;
        finalValue.split('').forEach((char, index) => {
            if (char === snippet.code[index]) {
                correctChars++;
            }
        });
        const calculatedAccuracy = Math.round((correctChars / snippet.code.length) * 100);
        setAccuracy(calculatedAccuracy);

        setIsFinished(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
            <Card className="w-full max-w-3xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-extrabold flex justify-center items-center gap-2">
                        <Type className="h-8 w-8 text-primary" />
                        Type-Racer: Code Edition
                    </CardTitle>
                    <p className="text-muted-foreground">Type the code snippet below as fast and accurately as you can!</p>
                </CardHeader>
                <CardContent>
                    <div 
                      className="relative font-code text-sm md:text-base leading-relaxed"
                      onClick={() => inputRef.current?.focus()}
                    >
                        <div className="p-4 rounded-lg bg-muted/50 border min-h-[150px] relative overflow-hidden">
                            <div className="flex justify-end mb-2">
                                <Badge variant="secondary">{snippet.language}</Badge>
                            </div>
                            <CodeDisplay ref={codeDisplayRef} snippet={snippet.code} userInput={userInput} />
                             <div className="absolute top-0 left-0 w-full h-full p-4 pointer-events-none">
                                <span className="whitespace-pre-wrap">
                                    <span className="text-transparent">{userInput}</span>
                                    {!isFinished && <span className="inline-block w-0.5 h-6 bg-primary animate-ping" />}
                                </span>
                            </div>
                        </div>
                        <textarea
                            ref={inputRef}
                            value={userInput}
                            onChange={handleInputChange}
                            className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-transparent resize-none focus:outline-none"
                            spellCheck="false"
                            autoCorrect="off"
                            autoCapitalize="off"
                            disabled={isFinished}
                        />
                    </div>

                    <AnimatePresence>
                    {isFinished && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-6"
                        >
                            <Card className="bg-primary/5">
                                <CardHeader className="text-center">
                                    <CardTitle>Results</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-around items-center text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <GaugeCircle className="h-8 w-8 text-primary" />
                                        <p className="text-3xl font-bold">{wpm}</p>
                                        <p className="text-muted-foreground">WPM</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <CheckCircle className="h-8 w-8 text-green-500" />
                                        <p className="text-3xl font-bold">{accuracy}%</p>
                                        <p className="text-muted-foreground">Accuracy</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <Timer className="h-8 w-8 text-yellow-500" />
                                        <p className="text-3xl font-bold">{startTime ? ((Date.now() - startTime) / 1000).toFixed(2) : '0.00'}s</p>
                                        <p className="text-muted-foreground">Time</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                     <Button onClick={resetGame} className="w-full">
                        <RefreshCw className="mr-2" />
                        {isFinished ? 'Try Another Snippet' : 'Reset'}
                    </Button>
                     <Button variant="ghost" asChild className="w-full">
                        <Link href="/games">Back to Game Center</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
