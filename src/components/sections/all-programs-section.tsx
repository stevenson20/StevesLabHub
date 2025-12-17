
"use client"

import React, { useState, useEffect } from 'react';
import type { Program, Subject } from "@/lib/types";
import { ProgramSearch } from "@/components/program-search"
import { Skeleton } from '@/components/ui/skeleton';

interface AllProgramsSectionProps {
  programs: Program[];
  subjects: Subject[];
}

export function AllProgramsSection({ programs, subjects }: AllProgramsSectionProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [programs]);

  return (
    <section id="all-programs" className="py-12">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Discover All Programs</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Use the search below to quickly find any lab program for the selected semester.
          </p>
        </div>
        {loading ? (
          <div>
            <Skeleton className="h-14 max-w-xl mx-auto mb-8 rounded-xl" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[180px] w-full rounded-xl" />
              ))}
            </div>
          </div>
        ) : programs.length > 0 ? (
          <ProgramSearch programs={programs} subjects={subjects} />
        ) : (
           <p className="text-center text-muted-foreground">No programs for this semester.</p>
        )}
      </div>
    </section>
  )
}
