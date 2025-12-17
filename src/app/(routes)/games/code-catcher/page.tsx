
"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw, Trophy, Play, Bug } from 'lucide-react';
import { bugList, type BugSnippet } from './bug-list';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

const CodeLine = ({ line, number, onSelect, isSelected, isRevealed, isCorrect }: { line: string, number: number, onSelect: (line: number) => void, isSelected: boolean, isRevealed: boolean, isCorrect: boolean }) => {
    return (
        <div
            onClick={() => !isRevealed && onSelect(number)}
            className={cn(
                "flex items-start gap-4 px-4 py-2 transition-colors duration-200 cursor-pointer rounded-md",
                !isRevealed && "hover:bg-accent hover:text-accent-foreground",
                isSelected && !isRevealed && "bg-accent text-accent-foreground",
                isRevealed && isCorrect && "bg-green-500/20 border-l-4 border-green-500",
                isRevealed && isSelected && !isCorrect && "bg-red-500/20 border-l-4 border-red-500",
            )}
        >
            <span className="w-6 text-right text-muted-foreground select-none pt-0.5">{number}</span>
            <pre className="text-sm whitespace-pre-wrap flex-1"><code>{line}</code></pre>
        </div>
    );
};

const getRandomSnippet = (currentId?: number): BugSnippet => {
    let snippet: BugSnippet;
    do {
        snippet = bugList[Math.floor(Math.random() * bugList.length)];
    } while (snippet.id === currentId);
    return snippet;
};

const getInitialTime = (difficulty: BugSnippet['difficulty']) => {
    switch(difficulty) {
        case 'easy': return 20;
        case 'medium': return 30;
        case 'hard': return 45;
        default: return 20;
    }
}

export default function CodeCatcherPage() {
    const [snippet, setSnippet] = useState<BugSnippet | null>(null);
    const [selectedLine, setSelectedLine] = useState<number | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [maxTime, setMaxTime] = useState(20);
    const [isGameOver, setIsGameOver] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);

    useEffect(() => {
        if (!isGameStarted) return;
        const newSnippet = getRandomSnippet();
        const newTime = getInitialTime(newSnippet.difficulty);
        setSnippet(newSnippet);
        setTimeLeft(newTime);
        setMaxTime(newTime);
        const savedHighScore = localStorage.getItem('code-catcher-highscore');
        setHighScore(savedHighScore ? parseInt(savedHighScore, 10) : 0);
        setIsGameOver(false);
    }, [isGameStarted]);

    useEffect(() => {
        if (isRevealed || isGameOver || !isGameStarted) return;

        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleReveal();
        }
    }, [timeLeft, isRevealed, isGameOver, isGameStarted]);

    const handleLineSelect = (line: number) => {
        setSelectedLine(line);
    };

    const handleReveal = () => {
        setIsRevealed(true);
        if (selectedLine === snippet?.buggyLine) {
            const newScore = score + timeLeft * 10;
            setScore(newScore);
             if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem('code-catcher-highscore', newScore.toString());
            }
        } else if (!isGameOver) {
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('code-catcher-highscore', score.toString());
            }
            setIsGameOver(true);
        }
    };

    const handleNext = () => {
        setIsRevealed(false);
        setSelectedLine(null);
        const newSnippet = getRandomSnippet(snippet?.id);
        const newTime = getInitialTime(newSnippet.difficulty);
        setSnippet(newSnippet);
        setTimeLeft(newTime);
        setMaxTime(newTime);
    };

    const handleRestart = () => {
        setIsGameOver(false);
        setScore(0);
        handleNext();
    };

    const startGame = () => {
        setIsGameStarted(true);
    }
    
    if (!isGameStarted || !snippet) {
         return (
             <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <Bug className="h-10 w-10 text-primary" />
                            <CardTitle className="text-4xl font-extrabold">Code-Catcher</CardTitle>
                        </div>
                        <CardDescription className="text-lg">Find the bug in the code snippet before the time runs out!</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground">Think you have a keen eye for errors? Let's find out!</p>
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                        <Button onClick={startGame} className="w-full">
                            <Play className="mr-2" /> Start Game
                        </Button>
                        <Button variant="ghost" asChild className="w-full">
                            <Link href="/games">Back to Game Center</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    const difficultyBadgeColor = {
        easy: 'bg-green-500/20 text-green-700 dark:text-green-400',
        medium: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
        hard: 'bg-red-500/20 text-red-700 dark:text-red-400',
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
            <AnimatePresence>
                {isGameOver ? (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                        <Card className="text-center max-w-md">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Game Over</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xl">Your final score is:</p>
                                <p className="text-6xl font-extrabold text-primary my-4">{score}</p>
                                <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
                                    <Trophy className="h-5 w-5 text-yellow-500" />
                                    <span>Best Score: {highScore}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-4">
                                <Button onClick={handleRestart} className="w-full">
                                    <RefreshCw className="mr-2" />
                                    Play Again
                                </Button>
                                 <Button variant="ghost" asChild className="w-full">
                                    <Link href="/games">Back to Game Center</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl">
                        <Card className="overflow-hidden">
                            <CardHeader className="flex flex-row flex-wrap items-center justify-between border-b gap-y-2">
                                <div>
                                    <CardTitle>Code-Catcher</CardTitle>
                                    <p className="text-muted-foreground text-sm mt-1">Find the bug in the code snippet below!</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Badge variant="outline" className={cn("capitalize", difficultyBadgeColor[snippet.difficulty])}>
                                        {snippet.difficulty}
                                    </Badge>
                                    <Badge variant="secondary">{snippet.language}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-64 sm:h-auto">
                                <div className="p-4 bg-black dark:bg-code-bg font-code text-gray-300">
                                    {snippet.code.map((line, index) => (
                                        <CodeLine
                                            key={index}
                                            line={line}
                                            number={index + 1}
                                            onSelect={handleLineSelect}
                                            isSelected={selectedLine === index + 1}
                                            isRevealed={isRevealed}
                                            isCorrect={snippet.buggyLine === index + 1}
                                        />
                                    ))}
                                </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-muted/50">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Score</p>
                                        <p className="font-bold text-lg">{score}</p>
                                    </div>
                                     <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Best</p>
                                        <p className="font-bold text-lg">{highScore}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Time</p>
                                        <p className="font-bold text-lg">{timeLeft}</p>
                                    </div>
                                </div>
                                <div className="flex-1 w-full sm:w-auto">
                                    <div className="relative h-2 w-full bg-border rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-primary"
                                            initial={{ width: '100%' }}
                                            animate={{ width: `${(timeLeft / maxTime) * 100}%` }}
                                            transition={{ duration: 1, ease: 'linear' }}
                                        />
                                    </div>
                                </div>
                                 <Button
                                    onClick={isRevealed ? handleNext : handleReveal}
                                    disabled={!selectedLine && !isRevealed}
                                    className="w-full sm:w-auto"
                                >
                                    {isRevealed ? 'Next Snippet' : 'Check Answer'}
                                </Button>
                            </CardFooter>
                             <AnimatePresence>
                            {isRevealed && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t"
                                >
                                    <div className="p-4 flex items-start gap-4">
                                        {selectedLine === snippet.buggyLine ? (
                                            <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                                        ) : (
                                            <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                                        )}
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                {selectedLine === snippet.buggyLine ? 'Correct!' : 'Incorrect!'}
                                            </h3>
                                            <p className="text-muted-foreground mt-1">
                                                The bug was on line {snippet.buggyLine}. {snippet.explanation}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
