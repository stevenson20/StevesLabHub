"use client"

import React, { useState, useEffect } from 'react';
import type { Material, Subject } from '@/lib/types';
import { MaterialCard } from '@/components/cards/material-card';
import { Skeleton } from '@/components/ui/skeleton';

interface StudyMaterialsSectionProps {
    materials: Material[];
    subjects: Subject[];
}

export function NotesSection({ materials, subjects }: StudyMaterialsSectionProps) {
    const [loading, setLoading] = useState(true);

    const subjectMap = new Map(subjects.map(s => [s.id, s]));

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [materials]);

    return (
        <section id="study-materials" className="py-12 bg-muted/30">
            <div className="container">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Study Materials & Links</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Quick access to important documents, cheat sheets, and external resources.
                    </p>
                </div>
                {loading ? (
                    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                           <Skeleton key={i} className="h-[220px] w-full rounded-xl" />
                        ))}
                    </div>
                ) : materials.length > 0 ? (
                    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4 animate-fade-in">
                        {materials.map(material => (
                            <MaterialCard key={material.id} material={material} subject={subjectMap.get(material.subjectId)} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">No materials or links for this semester.</p>
                )}
            </div>
        </section>
    );
}
