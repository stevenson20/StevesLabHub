
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SubjectsSection } from '@/components/sections/subjects-section';
import { AllProgramsSection } from '@/components/sections/all-programs-section';
import { NotesSection } from '@/components/sections/notes-section';
import { SyllabusSection } from '@/components/sections/syllabus-section';
import { materials, programs, subjects } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function DashboardClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeYear, setActiveYear] = useState(searchParams.get('year') || '3');
  const [activeSem, setActiveSem] = useState(searchParams.get('sem') || '1');

  useEffect(() => {
    // This effect ensures the component is interactive and uses client-side hooks,
    // but we won't push URL changes in a static build to avoid issues.
    // The initial state is already set from searchParams.
  }, [activeYear, activeSem]);

  const filteredData = useMemo(() => {
    const year = parseInt(activeYear);
    const sem = parseInt(activeSem);

    return {
      subjects: subjects.filter(s => s.year === year && s.semester === sem),
      programs: programs.filter(p => {
        const subject = subjects.find(s => s.id === p.subjectId);
        return subject && subject.year === year && subject.semester === sem;
      }),
      materials: materials.filter(m => {
        const subject = subjects.find(s => s.id === m.subjectId);
        return subject && subject.year === year && subject.semester === sem;
      }),
    };
  }, [activeYear, activeSem]);

  const syllabi = filteredData.materials.filter(m => m.type === 'Syllabus');
  const notes = filteredData.materials.filter(m => m.type !== 'Syllabus');

  return (
    <div className="relative z-10 w-full overflow-hidden container py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">Dashboard</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-center">
          Select a year and semester to explore all related academic materials for R-23.
        </p>
        <Tabs value={activeYear} onValueChange={setActiveYear} className="w-full max-w-md mt-8">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="3">Year 3</TabsTrigger>
          </TabsList>
        </Tabs>
        <ToggleGroup type="single" value={activeSem} onValueChange={(value) => {if(value) setActiveSem(value)}} className="mt-4">
          <ToggleGroupItem value="1" aria-label="Toggle Semester 1">
            Semester 1
          </ToggleGroupItem>
          <ToggleGroupItem value="2" aria-label="Toggle Semester 2">
            Semester 2
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <SubjectsSection subjects={filteredData.subjects} programs={filteredData.programs} />
      <SyllabusSection syllabi={syllabi} subjects={filteredData.subjects} />
      <AllProgramsSection programs={filteredData.programs} subjects={filteredData.subjects} />
      <NotesSection notes={notes} subjects={filteredData.subjects} />
    </div>
  );
}
