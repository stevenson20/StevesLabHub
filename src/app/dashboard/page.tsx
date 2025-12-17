
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SubjectsSection } from '@/components/sections/subjects-section';
import { AllProgramsSection } from '@/components/sections/all-programs-section';
import { NotesSection } from '@/components/sections/notes-section';
import { SyllabusSection } from '@/components/sections/syllabus-section';
import { subjects, programs, notes, syllabi, materials } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeYear, setActiveYear] = useState(searchParams.get('year') || '1');
  const [activeSem, setActiveSem] = useState(searchParams.get('sem') || '1');

  useEffect(() => {
    const newUrl = `/dashboard?year=${activeYear}&sem=${activeSem}`;
    router.replace(newUrl, { scroll: false });
  }, [activeYear, activeSem, router]);

  const filteredData = useMemo(() => {
    const year = parseInt(activeYear);
    const sem = parseInt(activeSem);

    return {
      subjects: subjects.filter(s => s.year === year && s.semester === sem),
      programs: programs.filter(p => {
        const subject = subjects.find(s => s.id === p.subjectId);
        return subject && subject.year === year && subject.semester === sem;
      }),
      notes: notes.filter(n => {
        const subject = subjects.find(s => s.id === n.subjectId);
        return subject && subject.year === year && subject.semester === sem;
      }),
      syllabi: syllabi.filter(s => {
         const subject = subjects.find(subj => subj.id === s.subjectId);
         return subject && subject.year === year && subject.semester === sem;
      }),
      materials: materials.filter(m => {
        const subject = subjects.find(s => s.id === m.subjectId);
        return subject && subject.year === year && subject.semester === sem;
      }),
    };
  }, [activeYear, activeSem]);

  return (
    <div className="relative z-10 w-full overflow-hidden container py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">Dashboard</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-center">
          Select a year and semester to explore all related academic materials.
        </p>
        <Tabs value={activeYear} onValueChange={setActiveYear} className="w-full max-w-md mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1">Year 1</TabsTrigger>
            <TabsTrigger value="2">Year 2</TabsTrigger>
            <TabsTrigger value="3">Year 3</TabsTrigger>
            <TabsTrigger value="4">Year 4</TabsTrigger>
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
      <SyllabusSection syllabi={filteredData.syllabi} subjects={filteredData.subjects} />
      <AllProgramsSection programs={filteredData.programs} subjects={filteredData.subjects} />
      <NotesSection notes={filteredData.notes} subjects={filteredData.subjects} />
    </div>
  );
}
