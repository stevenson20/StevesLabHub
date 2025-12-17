
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play, Pyramid, Trophy, Medal, Info } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const DISK_HEIGHT = 24;
const INITIAL_DISKS = 3;

type Disk = {
  id: number;
  width: number;
  color: string;
};

type Rod = {
  id: number;
  disks: Disk[];
  ref: React.RefObject<HTMLDivElement>;
};

const generateDisks = (num: number): Disk[] => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688'];
  return Array.from({ length: num }, (_, i) => ({
    id: num - i,
    width: 60 + (num - i - 1) * 20,
    color: colors[i % colors.length],
  }));
};

const ConfettiPiece = ({ x, y, rotation }: { x: number, y: number, rotation: number }) => (
    <motion.div
        style={{
            x,
            y,
            rotate: rotation,
            background: `hsl(${Math.random() * 360}, 100%, 50%)`,
            width: 8,
            height: 16,
            position: 'absolute',
            top: 0,
            left: '50%',
        }}
        animate={{
            y: [y, y + 200],
            opacity: [1, 0],
            rotate: rotation + 180,
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
    />
);

export default function TowersOfHanoiPage() {
    const rod1Ref = useRef<HTMLDivElement>(null);
    const rod2Ref = useRef<HTMLDivElement>(null);
    const rod3Ref = useRef<HTMLDivElement>(null);

    const [rods, setRods] = useState<Rod[]>([]);
    const [numDisks, setNumDisks] = useState(INITIAL_DISKS);
    const [moves, setMoves] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isWon, setIsWon] = useState(false);
    const [draggedDisk, setDraggedDisk] = useState<{ disk: Disk; fromRod: number } | null>(null);

    const rodRefs = [rod1Ref, rod2Ref, rod3Ref];

    useEffect(() => {
        if(isGameStarted) {
            resetGame(numDisks);
        }
    }, [isGameStarted, numDisks]);
    
    const resetGame = (diskCount: number) => {
        setNumDisks(diskCount);
        setRods([
            { id: 0, disks: generateDisks(diskCount), ref: rod1Ref },
            { id: 1, disks: [], ref: rod2Ref },
            { id: 2, disks: [], ref: rod3Ref },
        ]);
        setMoves(0);
        setIsWon(false);
    };

    const handleDragStart = (disk: Disk, fromRod: number) => {
        if (rods[fromRod].disks[rods[fromRod].disks.length - 1].id === disk.id) {
             setDraggedDisk({ disk, fromRod });
        }
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent) => {
        if (!draggedDisk) return;

        const { disk, fromRod } = draggedDisk;
        const dropX = event instanceof MouseEvent ? event.clientX : (event as TouchEvent).touches[0].clientX;
        
        let targetRodIndex: number | null = null;
        for (let i = 0; i < rodRefs.length; i++) {
            const rodEl = rodRefs[i].current;
            if (rodEl) {
                const rect = rodEl.getBoundingClientRect();
                if (dropX >= rect.left && dropX <= rect.right) {
                    targetRodIndex = i;
                    break;
                }
            }
        }
        
        if (targetRodIndex !== null && targetRodIndex !== fromRod) {
            const toRod = rods[targetRodIndex];
            if (toRod.disks.length === 0 || disk.id < toRod.disks[toRod.disks.length - 1].id) {
                 const newRods = rods.map(rod => ({
                    ...rod,
                    disks: [...rod.disks]
                }));
                
                newRods[fromRod].disks.pop();
                newRods[targetRodIndex].disks.push(disk);
                
                setRods(newRods);
                setMoves(m => m + 1);

                if (newRods[1].disks.length === numDisks || newRods[2].disks.length === numDisks) {
                    setIsWon(true);
                }
            }
        }
        
        setDraggedDisk(null);
    };
    
    if (!isGameStarted) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <Pyramid className="h-10 w-10 text-primary" />
                            <CardTitle className="text-4xl font-extrabold">Towers of Hanoi</CardTitle>
                        </div>
                        <CardDescription className="text-lg">The classic recursive puzzle. Can you solve it?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Select the number of disks to start.</p>
                        <div className="flex justify-center gap-2 mt-4 flex-wrap">
                            {[3, 4, 5, 6].map(n => (
                                <Button key={n} variant={numDisks === n ? 'default' : 'outline'} onClick={() => setNumDisks(n)}>
                                    {n} Disks
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                        <Button onClick={() => setIsGameStarted(true)} className="w-full">
                            <Play className="mr-2" /> Start Game
                        </Button>
                        <Button variant="ghost" asChild className="w-full">
                            <Link href="/games">Back to Game Center</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
    

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100svh-10rem)] p-4">
            <Card className="w-full max-w-4xl text-center overflow-hidden">
                <CardHeader>
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <Pyramid className="h-8 w-8 text-primary" />
                        <CardTitle className="text-3xl font-extrabold">Towers of Hanoi</CardTitle>
                    </div>
                     <div className="flex justify-center gap-6 text-lg">
                        <div className="flex items-center gap-2"><Medal className="text-yellow-500" />Moves: <span className="font-bold">{moves}</span></div>
                        <div className="flex items-center gap-2"><Trophy className="text-green-500" />Min. Moves: <span className="font-bold">{Math.pow(2, numDisks) - 1}</span></div>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-around items-end min-h-[300px] p-6">
                    {rods.map((rod, rodIndex) => (
                        <div key={rod.id} ref={rod.ref} className="relative flex flex-col-reverse items-center w-1/3 h-[250px]">
                            <div className="absolute bottom-0 w-full h-2 bg-muted rounded-md" />
                            <div className="absolute bottom-0 w-2 h-[180px] bg-muted rounded-md" />
                            
                            <AnimatePresence>
                            {rod.disks.map((disk, diskIndex) => (
                                <motion.div
                                    key={disk.id}
                                    layoutId={disk.id.toString()}
                                    drag={rod.disks[rod.disks.length - 1].id === disk.id ? "x" : false}
                                    dragSnapToOrigin
                                    onDragStart={() => handleDragStart(disk, rodIndex)}
                                    onDragEnd={handleDragEnd}
                                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    dragElastic={0.1}
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ 
                                        y: 0, 
                                        opacity: 1,
                                        transition: { type: 'spring', stiffness: 300, damping: 20 }
                                    }}
                                    exit={{ y: -50, opacity: 0 }}
                                    style={{
                                        width: disk.width,
                                        height: DISK_HEIGHT,
                                        backgroundColor: disk.color,
                                        bottom: diskIndex * DISK_HEIGHT,
                                        zIndex: 10 + disk.id,
                                    }}
                                    className={cn(
                                        "absolute rounded-md shadow-md",
                                        rod.disks[rod.disks.length - 1].id === disk.id ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                                    )}
                                />
                            ))}
                            </AnimatePresence>
                        </div>
                    ))}
                </CardContent>
                <div className="p-4 bg-muted/50 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Info className="h-4 w-4" />
                        <p><span className="font-bold">Rules:</span> Move one disk at a time. A larger disk cannot be placed on a smaller one.</p>
                    </div>
                </div>
                <CardFooter className="flex-col gap-4 pt-6">
                     <Button onClick={() => resetGame(numDisks)} className="w-full max-w-sm">
                        <RefreshCw className="mr-2" /> Reset Game
                    </Button>
                     <Button variant="ghost" asChild className="w-full max-w-sm">
                        <Link href="/games">Back to Game Center</Link>
                    </Button>
                </CardFooter>
            </Card>

            <AnimatePresence>
            {isWon && (
                <div className="absolute inset-0 z-50">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <ConfettiPiece
                            key={i}
                            x={Math.random() * window.innerWidth - window.innerWidth / 2}
                            y={-20 - Math.random() * 50}
                            rotation={Math.random() * 360}
                        />
                    ))}
                </div>
            )}
            </AnimatePresence>

            <AlertDialog open={isWon} onOpenChange={setIsWon}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Congratulations!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You solved the puzzle with {numDisks} disks in {moves} moves.
                        {moves === Math.pow(2, numDisks) - 1 && " That's the minimum possible number of moves!"}
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <Button variant="outline" asChild>
                        <Link href="/games">Back to Game Center</Link>
                    </Button>
                    <Button onClick={() => resetGame(numDisks)}>Play Again</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

    
