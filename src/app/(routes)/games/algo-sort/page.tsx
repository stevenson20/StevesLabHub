
"use client"

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw, ListTree, Play } from 'lucide-react';
import { algorithmList, type Algorithm } from './algorithm-list';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const getRandomAlgorithm = (): Algorithm => {
    const [randomAlgorithm] = shuffleArray(algorithmList);
    return randomAlgorithm;
};

export default function AlgoSortPage() {
    const [algorithm, setAlgorithm] = useState(getRandomAlgorithm);
    const [shuffledSteps, setShuffledSteps] = useState(() => shuffleArray(algorithm.steps));
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    
    const checkOrder = () => {
        const correct = shuffledSteps.every((step, index) => step === algorithm.steps[index]);
        setIsCorrect(correct);
        setIsSubmitted(true);
    };

    const resetGame = () => {
        const newAlgorithm = getRandomAlgorithm();
        setAlgorithm(newAlgorithm);
        setShuffledSteps(shuffleArray(newAlgorithm.steps));
        setIsCorrect(null);
        setIsSubmitted(false);
        setIsGameStarted(true);
    };
    
    const startGame = () => {
        setIsGameStarted(true);
    }

    if (!isGameStarted) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <ListTree className="h-10 w-10 text-primary" />
                            <CardTitle className="text-4xl font-extrabold">Algo-Sort</CardTitle>
                        </div>
                        <CardDescription className="text-lg">Arrange the steps of a classic algorithm in the correct order.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Ready to test your algorithmic knowledge?</p>
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

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <ListTree className="h-8 w-8 text-primary" />
                        <CardTitle className="text-3xl font-extrabold">Algo-Sort</CardTitle>
                    </div>
                    <CardDescription className="text-lg">
                        Arrange the steps for: <span className="font-bold text-primary">{algorithm.name}</span>
                    </CardDescription>
                    <p className="text-sm text-muted-foreground px-4">{algorithm.description}</p>
                </CardHeader>
                <CardContent>
                    <Reorder.Group axis="y" values={shuffledSteps} onReorder={setShuffledSteps} className="space-y-3">
                        {shuffledSteps.map((step, index) => (
                            <Reorder.Item
                                key={step}
                                value={step}
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={0.1}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={cn(
                                    "p-4 rounded-lg cursor-grab active:cursor-grabbing flex items-center gap-4 transition-colors",
                                    isSubmitted && (step === algorithm.steps[index] ? 'bg-green-500/10' : 'bg-red-500/10'),
                                    !isSubmitted && 'bg-muted hover:bg-accent'
                                )}
                                whileDrag={{ scale: 1.03, boxShadow: '0px 5px 15px rgba(0,0,0,0.1)' }}
                            >
                                <span className="text-lg font-bold text-primary select-none">{index + 1}</span>
                                <p>{step}</p>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    {!isSubmitted ? (
                        <Button onClick={checkOrder} className="w-full">Check Order</Button>
                    ) : (
                        <div className="w-full flex flex-col items-center gap-4">
                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 text-lg font-semibold">
                                {isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                                <span>{isCorrect ? 'Perfect! You got it right!' : 'Not quite right. Try again!'}</span>
                            </motion.div>
                            <Button onClick={resetGame} className="w-full">
                                <RefreshCw className="mr-2" />
                                Try Another Algorithm
                            </Button>
                        </div>
                    )}
                     <Button variant="ghost" asChild className="w-full">
                        <Link href="/games">Back to Game Center</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
