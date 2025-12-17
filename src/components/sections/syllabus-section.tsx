
"use client"

import React, { useState, useEffect } from 'react';
import type { Syllabus, Subject } from '@/lib/types';
import { SyllabusCard } from '@/components/cards/syllabus-card';
import { Skeleton } from '@/components/ui/skeleton';

interface SyllabusSectionProps {
  syllabi: Syllabus[];
  subjects: Subject[];
}

export function SyllabusSection({ syllabi, subjects }: SyllabusSectionProps) {
    const [loading, setLoading] = useState(true);

    const subjectMap = new Map(subjects.map(s => [s.id, s]));

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, [syllabi]);

    return (
        <section id="syllabus" className="py-12 bg-muted/30">
            <div className="container">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Syllabus Archive</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Download the syllabus for each subject.
                    </p>
                </div>
                {loading ? (
                    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-3">
                        {Array.from({ length: 2 }).map((_, i) => (
                           <Skeleton key={i} className="h-[220px] w-full rounded-xl" />
                        ))}
                    </div>
                ) : syllabi.length > 0 ? (
                    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-3 animate-fade-in">
                        {syllabi.map(syllabus => (
                            <SyllabusCard key={syllabus.id} syllabus={syllabus} subject={subjectMap.get(syllabus.subjectId)} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">No syllabus documents for this semester.</p>
                )}
            </div>
        </section>
    );
}
