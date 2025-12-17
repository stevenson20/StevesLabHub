
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, RefreshCw, Play, Brain, Trophy, ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { quizData, type QuizQuestion } from './quiz-data';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const TOTAL_QUESTIONS = 10;
type Difficulty = 'easy' | 'medium' | 'hard';
type Category = 'JavaScript' | 'Python' | 'HTML/CSS' | 'General CS' | 'C++';

const allCategories: Category[] = ['JavaScript', 'Python', 'HTML/CSS', 'General CS', 'C++'];

const getInitialTime = (difficulty: Difficulty) => {
    switch (difficulty) {
        case 'easy': return 25;
        case 'medium': return 20;
        case 'hard': return 15;
    }
}

export default function TechQuizPage() {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(allCategories);
    const [timeLeft, setTimeLeft] = useState(getInitialTime(difficulty));
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');

    const currentQuestion = questions[currentQuestionIndex];

    const startQuiz = useCallback(() => {
        const filteredQuestions = quizData.filter(q => 
            q.difficulty === difficulty &&
            (selectedCategories.length === 0 || selectedCategories.includes(q.category))
        );
        
        if (filteredQuestions.length < TOTAL_QUESTIONS) {
            alert(`Not enough questions for the selected criteria. Found only ${filteredQuestions.length}. Please select more categories or a different difficulty.`);
            return;
        }

        const shuffledQuestions = shuffleArray(filteredQuestions).slice(0, TOTAL_QUESTIONS);
        setQuestions(shuffledQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(getInitialTime(difficulty));
        setGameState('playing');
    }, [difficulty, selectedCategories]);

    useEffect(() => {
        if (gameState !== 'playing' || isAnswered) return;

        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            handleAnswerSelect(null); // Timeout counts as wrong answer
        }
    }, [gameState, timeLeft, isAnswered]);

    const handleAnswerSelect = (answer: string | null) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        setIsAnswered(true);

        if (answer === currentQuestion.answer) {
            setScore(prev => prev + Math.max(timeLeft, 1) * 10); // More points for faster answers
        }

        setTimeout(() => {
            if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
                setIsAnswered(false);
                setTimeLeft(getInitialTime(difficulty));
            } else {
                setGameState('end');
            }
        }, 2500);
    };

    const handleCategoryChange = (category: Category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    if (gameState === 'start') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <Brain className="h-10 w-10 text-primary" />
                            <CardTitle className="text-4xl font-extrabold">Tech Quiz</CardTitle>
                        </div>
                        <CardDescription className="text-lg">A fun quiz to test your computer science knowledge.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label className="font-bold text-lg mb-2 block">Select Difficulty</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button variant={difficulty === 'easy' ? 'default' : 'outline'} onClick={() => setDifficulty('easy')}>Easy</Button>
                                <Button variant={difficulty === 'medium' ? 'default' : 'outline'} onClick={() => setDifficulty('medium')}>Medium</Button>
                                <Button variant={difficulty === 'hard' ? 'default' : 'outline'} onClick={() => setDifficulty('hard')}>Hard</Button>
                            </div>
                        </div>
                         <div>
                            <Label className="font-bold text-lg mb-4 block">Select Categories</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                                {allCategories.map(category => (
                                    <div key={category} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={category}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => handleCategoryChange(category)}
                                        />
                                        <label
                                            htmlFor={category}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-4 pt-6">
                        <Button onClick={startQuiz} className="w-full" disabled={selectedCategories.length === 0}>
                            <Play className="mr-2" /> Start Quiz
                        </Button>
                        <Button variant="ghost" asChild className="w-full">
                            <Link href="/games">Back to Game Center</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
    
    if (gameState === 'end') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
                 <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="text-center max-w-md w-full">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xl">Your final score is:</p>
                            <motion.p initial={{scale:0.5}} animate={{scale:1}} transition={{type: 'spring', stiffness: 200, damping:10}} className="text-6xl font-extrabold text-primary my-4">{score}</motion.p>
                             <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                <span>Thanks for playing!</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-4">
                            <Button onClick={() => setGameState('start')} className="w-full">
                                <RefreshCw className="mr-2" /> Play Again
                            </Button>
                            <Button variant="ghost" asChild className="w-full">
                                <Link href="/games">Back to Game Center</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        )
    }

    if (!currentQuestion) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle>Loading...</CardTitle>
                    </CardHeader>
                </Card>
             </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
            <Card className="w-full max-w-2xl relative overflow-hidden">
                 <div className="h-2 w-full absolute top-0 left-0">
                    <Progress value={(timeLeft / getInitialTime(difficulty)) * 100} className="h-full bg-primary/20 [&>div]:bg-primary transition-all duration-1000 ease-linear" />
                </div>
                <CardHeader>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}</span>
                        <span>Score: <span className="font-bold text-foreground">{score}</span></span>
                    </div>
                    <CardTitle className="text-xl md:text-2xl min-h-[6rem] flex items-center justify-center text-center">
                        {currentQuestion.question}
                    </CardTitle>
                    <div className="flex justify-center pt-2">
                        <Badge variant="secondary">{currentQuestion.category}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => {
                            const isCorrect = option === currentQuestion.answer;
                            const isSelected = option === selectedAnswer;

                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="lg"
                                    className={cn(
                                        "h-auto py-4 whitespace-normal justify-start text-left",
                                        isAnswered && isCorrect && "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300 hover:bg-green-500/30",
                                        isAnswered && isSelected && !isCorrect && "bg-red-500/20 border-red-500 text-red-700 dark:text-red-300 hover:bg-red-500/30"
                                    )}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={isAnswered}
                                >
                                    <div className="flex-1">{option}</div>
                                     <AnimatePresence>
                                        {isAnswered && isCorrect && (
                                            <motion.div initial={{scale:0}} animate={{scale:1}}>
                                                <Check className="h-5 w-5 text-green-500" />
                                            </motion.div>
                                        )}
                                        {isAnswered && isSelected && !isCorrect && (
                                             <motion.div initial={{scale:0}} animate={{scale:1}}>
                                                <X className="h-5 w-5 text-red-500" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
                <AnimatePresence>
                {isAnswered && (
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-6 pt-0"
                     >
                        <Card className="bg-accent/50 border-dashed">
                            <CardContent className="p-4 text-sm text-accent-foreground flex items-start gap-3">
                                <Lightbulb className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold">Explanation</h4>
                                    <p>{currentQuestion.explanation}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
                </AnimatePresence>
                 <CardFooter className="flex-col gap-4">
                    {/* This button is now largely decorative as the game auto-advances */}
                    <Button 
                        onClick={() => {}}
                        variant="secondary"
                        className={cn("transition-opacity", (!isAnswered || currentQuestionIndex === TOTAL_QUESTIONS - 1) ? 'opacity-0 pointer-events-none' : 'opacity-100')}
                    >
                        Next Question <ArrowRight className="ml-2" />
                    </Button>
                 </CardFooter>
            </Card>
        </div>
    );
}
