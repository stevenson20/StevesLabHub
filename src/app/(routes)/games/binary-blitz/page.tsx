
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw, Binary, Trophy, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const BITS = 8;
const GAME_DURATION = 60;

const getRandomNumber = () => Math.floor(Math.random() * 256);

const NumberCard = ({ num }: { num: number }) => (
    <motion.div
        key={num}
        initial={{ y: -20, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: 'backOut' }}
        className="text-6xl md:text-7xl font-extrabold text-primary p-6 bg-primary/10 rounded-2xl"
    >
        {num}
    </motion.div>
);


const BitBoard = ({ bits, onToggle, disabled }: { bits: boolean[], onToggle: (index: number) => void, disabled: boolean }) => {
    const powers = [128, 64, 32, 16, 8, 4, 2, 1];
    return (
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 my-8">
            {bits.map((bit, index) => (
                <div key={index} className="flex flex-col items-center">
                    <button
                        onClick={() => onToggle(index)}
                        disabled={disabled}
                        className={cn(
                            "w-12 h-16 md:w-16 md:h-20 rounded-lg text-4xl font-bold transition-all duration-200 flex items-center justify-center",
                            bit ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground",
                            !disabled && "hover:scale-105"
                        )}
                    >
                        {bit ? '1' : '0'}
                    </button>
                    <span className="text-xs text-muted-foreground mt-2">{powers[index]}</span>
                </div>
            ))}
        </div>
    );
};


export default function BinaryBlitzPage() {
    const [targetNumber, setTargetNumber] = useState(0);
    const [bits, setBits] = useState(Array(BITS).fill(false));
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [isGameOver, setIsGameOver] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const resetBits = () => setBits(Array(BITS).fill(false));

    const nextRound = useCallback(() => {
        setIsCorrect(null);
        resetBits();
        setTargetNumber(getRandomNumber());
    }, []);
    
    useEffect(() => {
        if (!isGameStarted) return;
        const savedHighScore = localStorage.getItem('binary-blitz-highscore');
        setHighScore(savedHighScore ? parseInt(savedHighScore, 10) : 0);
        restartGame();
    }, [isGameStarted]);

    useEffect(() => {
        if (isGameOver || !isGameStarted) return;

        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsGameOver(true);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('binary-blitz-highscore', score.toString());
            }
        }
    }, [timeLeft, isGameOver, score, highScore, isGameStarted]);

    const handleBitToggle = (index: number) => {
        const newBits = [...bits];
        newBits[index] = !newBits[index];
        setBits(newBits);
    };

    const checkAnswer = () => {
        const userValue = bits.reduce((sum, bit, index) => {
            return sum + (bit ? Math.pow(2, BITS - 1 - index) : 0);
        }, 0);

        if (userValue === targetNumber) {
            setScore(prev => prev + 10);
            setIsCorrect(true);
            setTimeout(nextRound, 800);
        } else {
            setIsCorrect(false);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('binary-blitz-highscore', score.toString());
            }
            setIsGameOver(true);
        }
    };
    
    const startGame = () => {
        setIsGameStarted(true);
    };

    const restartGame = useCallback(() => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setIsGameOver(false);
        nextRound();
    },[nextRound]);
    
    if (!isGameStarted) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <Binary className="h-10 w-10 text-primary" />
                            <CardTitle className="text-4xl font-extrabold">Binary Blitz</CardTitle>
                        </div>
                        <CardDescription className="text-lg">Convert decimal numbers to binary as fast as you can!</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground">Are you ready for the challenge?</p>
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
            <AnimatePresence>
                {isGameOver ? (
                     <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                        <Card className="text-center max-w-md w-full">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">{score > 0 ? "Time's Up!" : "Game Over"}</CardTitle>
                                {isCorrect === false && <p className="text-red-500 font-semibold mt-2">Incorrect Answer!</p>}
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
                                <Button onClick={restartGame} className="w-full">
                                    <RefreshCw className="mr-2" /> Play Again
                                </Button>
                                <Button variant="ghost" asChild className="w-full">
                                    <Link href="/games">Back to Game Center</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-lg">
                        <Card className="text-center overflow-hidden">
                            <CardHeader>
                                <div className="flex justify-center items-center gap-3 mb-2">
                                    <Binary className="h-8 w-8 text-primary" />
                                    <CardTitle className="text-3xl font-extrabold">Binary Blitz</CardTitle>
                                </div>
                                <p className="text-muted-foreground">Convert the decimal number to binary!</p>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <div className="flex items-center justify-between w-full text-lg mb-6 px-4">
                                     <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Score</p>
                                        <p className="font-bold">{score}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Best</p>
                                        <p className="font-bold">{highScore}</p>
                                    </div>
                                     <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Time</p>
                                        <p className="font-bold">{timeLeft}</p>
                                    </div>
                                </div>
                                
                                <AnimatePresence mode="wait">
                                    <NumberCard num={targetNumber} />
                                </AnimatePresence>

                                <BitBoard bits={bits} onToggle={handleBitToggle} disabled={isCorrect !== null} />
                                
                                <AnimatePresence>
                                {isCorrect !== null && (
                                     <motion.div 
                                        key="feedback"
                                        initial={{scale: 0.5, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        className="flex items-center gap-2 text-lg font-semibold my-4"
                                     >
                                        {isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                                        <span>{isCorrect ? 'Correct!' : 'Incorrect!'}</span>
                                     </motion.div>
                                )}
                                </AnimatePresence>
                            </CardContent>
                             <CardFooter className="flex-col gap-2">
                                <Button onClick={checkAnswer} disabled={isCorrect !== null} className="w-full">
                                    Submit Answer
                                </Button>
                                 <Button variant="outline" onClick={resetBits} disabled={isCorrect !== null} className="w-full">
                                    Reset Bits
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
