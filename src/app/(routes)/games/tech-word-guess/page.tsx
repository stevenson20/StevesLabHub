
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { techWords } from './word-list';
import { RefreshCw, Delete } from 'lucide-react';
import Link from 'next/link';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const getTodaysWord = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return techWords[dayOfYear % techWords.length].toUpperCase();
}

const Keyboard = ({ onKey, onEnter, onDelete, keyStatuses }: { onKey: (key: string) => void, onEnter: () => void, onDelete: () => void, keyStatuses: { [key: string]: string } }) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
  ];

  const getKeyClass = (key: string) => {
    const status = keyStatuses[key];
    return cn(
      "h-12 flex-1 rounded-md text-xs font-bold uppercase transition-colors sm:h-14 sm:text-base",
      status === 'correct' ? 'bg-green-500 text-white' :
      status === 'present' ? 'bg-yellow-500 text-white' :
      status === 'absent' ? 'bg-muted/50 text-muted-foreground' : 'bg-muted hover:bg-accent'
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-2">
      {keys.map((row, i) => (
        <div key={i} className={cn("flex w-full justify-center space-x-1.5 sm:space-x-2", i === 1 && "px-[5%]")}>
          {row.map(key => {
            if (key === 'ENTER') {
              return <button key={key} className={cn(getKeyClass(key), "flex-[1.5] text-xs px-2")} onClick={onEnter}>Enter</button>;
            }
            if (key === 'DELETE') {
              return <button key={key} className={cn(getKeyClass(key), "flex-[1.5] px-2 flex items-center justify-center")} onClick={onDelete}><Delete /></button>;
            }
            return <button key={key} className={getKeyClass(key)} onClick={() => onKey(key)}>{key}</button>;
          })}
        </div>
      ))}
    </div>
  );
};

const Grid = ({ guesses, currentGuess, turn }: { guesses: any[], currentGuess: string, turn: number }) => {
  return (
    <div className="grid grid-rows-6 gap-1.5 sm:gap-2">
      {Array(MAX_GUESSES).fill(0).map((_, i) => {
        const guess = guesses[i];
        const isCurrentRow = i === turn;

        return (
          <div key={i} className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {Array(WORD_LENGTH).fill(0).map((_, j) => {
              const char = isCurrentRow ? currentGuess[j] : guess ? guess[j]?.char : '';
              const status = guess ? guess[j]?.status : '';

              return (
                <motion.div
                  key={j}
                  initial={{ scale: 1 }}
                  animate={isCurrentRow && currentGuess[j] ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-lg border-2 text-2xl font-extrabold uppercase sm:text-4xl",
                    status === 'correct' ? 'border-green-500 bg-green-500 text-white' :
                    status === 'present' ? 'border-yellow-500 bg-yellow-500 text-white' :
                    status === 'absent' ? 'border-muted/80 bg-muted/80 text-white' :
                    'border-border bg-card'
                  )}
                >
                  <AnimatePresence>
                    {char && (
                      <motion.div
                        initial={!isCurrentRow ? { rotateX: 0 } : { rotateX: -360 }}
                        animate={{ rotateX: 0 }}
                        transition={{ duration: 0.5, delay: j * 0.1 }}
                      >
                        {char}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default function TechWordGuessPage() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState<any[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [turn, setTurn] = useState(0);
  const [keyStatuses, setKeyStatuses] = useState<{ [key: string]: string }>({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const resetGame = useCallback(() => {
    const newSolution = getTodaysWord();
    setSolution(newSolution);
    setGuesses([]);
    setCurrentGuess('');
    setTurn(0);
    setKeyStatuses({});
    setIsGameOver(false);
    setIsWin(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleKey = (key: string) => {
    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  };
  
  const handleDelete = () => {
    setCurrentGuess(prev => prev.slice(0, -1));
  };
  
  const handleEnter = useCallback(() => {
    if (turn >= MAX_GUESSES || isGameOver) return;

    if (currentGuess.length !== WORD_LENGTH) {
      showToast('Not enough letters');
      return;
    }

    if (!techWords.includes(currentGuess.toLowerCase())) {
      showToast('Not in word list');
      return;
    }
    
    const formatGuess = () => {
        let solutionArray: (string | null)[] = [...solution];
        let formattedGuess = [...currentGuess].map(char => ({ char, status: 'absent' }));

        // Find correct letters
        formattedGuess.forEach((g, i) => {
            if (solutionArray[i] === g.char) {
                formattedGuess[i].status = 'correct';
                solutionArray[i] = null;
            }
        });

        // Find present letters
        formattedGuess.forEach((g, i) => {
            if (g.status !== 'correct' && solutionArray.includes(g.char)) {
                formattedGuess[i].status = 'present';
                solutionArray[solutionArray.indexOf(g.char)] = null;
            }
        });
        
        // Update key statuses
        const newKeyStatuses = {...keyStatuses};
        formattedGuess.forEach(({char, status}) => {
            const currentStatus = newKeyStatuses[char as keyof typeof newKeyStatuses];
            if (status === 'correct') {
              newKeyStatuses[char as keyof typeof newKeyStatuses] = status;
            } else if (status === 'present' && currentStatus !== 'correct') {
              newKeyStatuses[char as keyof typeof newKeyStatuses] = status;
            } else if (!currentStatus) {
                newKeyStatuses[char as keyof typeof newKeyStatuses] = 'absent';
            }
        });
        setKeyStatuses(newKeyStatuses);
        
        return formattedGuess;
    };

    const formatted = formatGuess();
    setGuesses(prev => [...prev, formatted]);
    setTurn(prev => prev + 1);
    setCurrentGuess('');

    if (currentGuess === solution) {
      setIsGameOver(true);
      setIsWin(true);
    } else if (turn + 1 === MAX_GUESSES) {
      setIsGameOver(true);
      setIsWin(false);
    }
  }, [currentGuess, isGameOver, turn, solution, keyStatuses]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (e.key === 'Enter') handleEnter();
      else if (e.key === 'Backspace') handleDelete();
      else if (e.key.match(/^[a-zA-Z]$/)) handleKey(e.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver, handleEnter]);


  return (
    <div className="flex h-full max-h-[100svh] w-full flex-col items-center justify-between p-2 pb-4 sm:p-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Tech Word Guess</h1>
        
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="pointer-events-none absolute top-12 sm:top-20 z-50"
            >
              <div className="rounded-md bg-foreground px-4 py-2 font-semibold text-background shadow-lg">
                {toast}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-[330px] sm:max-w-sm my-4">
          <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
        </div>
      
      <div className="w-full space-y-4">
        <Keyboard onKey={handleKey} onEnter={handleEnter} onDelete={handleDelete} keyStatuses={keyStatuses} />
        <Button variant="ghost" asChild className="w-full max-w-lg mx-auto">
            <Link href="/games">Back to Game Center</Link>
        </Button>
      </div>

       <Dialog open={isGameOver}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isWin ? 'Congratulations!' : 'Game Over'}</DialogTitle>
            <DialogDescription>
              {isWin ? `You guessed the word in ${turn} ${turn > 1 ? 'guesses' : 'guess'}.` : `The word was ${solution}. Better luck next time!`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button onClick={resetGame} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
            <Button variant="outline" asChild className="w-full">
                <Link href="/games">Back to Game Center</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
