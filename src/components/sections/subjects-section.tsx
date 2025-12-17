
"use client"

import React, { useState, useEffect, useRef } from 'react';
import type { Program, Subject } from '@/lib/types';
import { SubjectCard } from '@/components/cards/subject-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface SubjectsSectionProps {
  subjects: Subject[];
  programs: Program[];
}

export function SubjectsSection({ subjects, programs }: SubjectsSectionProps) {
  const [theorySubjects, setTheorySubjects] = useState<Subject[]>([]);
  const [labSubjects, setLabSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const theory = subjects.filter(s => !s.isLabOnly);
      const lab = subjects.filter(s => s.hasLab);
      setTheorySubjects(theory);
      setLabSubjects(lab);
      setLoading(false);
    }, 300);
  }, [subjects]);


  const getProgramCount = (subjectId: string) => {
    return programs.filter(p => p.subjectId === subjectId).length;
  };
  
  const SubjectGrid = ({ subjectList }: { subjectList: Subject[] }) => {
    if (subjectList.length === 0) {
      return <p className="text-center text-muted-foreground mt-8">No subjects for this semester.</p>
    }
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {subjectList.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} programCount={getProgramCount(subject.id)} />
        ))}
      </div>
    )
  };

  const SkeletonGrid = () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[220px] w-full rounded-2xl" />
      ))}
    </div>
  );

  return (
    <section id="subjects" className="py-12">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse by Category</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore subjects and labs to find the materials and code you need.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-full max-w-lg mb-8" />
            <SkeletonGrid />
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full animate-fade-in">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 max-w-lg mx-auto h-auto">
              <TabsTrigger value="all" className="py-2">All</TabsTrigger>
              <TabsTrigger value="subjects" className="py-2">Subjects</TabsTrigger>
              <TabsTrigger value="labs" className="py-2">Labs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <SubjectGrid subjectList={subjects} />
            </TabsContent>
            <TabsContent value="subjects" className="mt-8">
              <SubjectGrid subjectList={theorySubjects} />
            </TabsContent>
            <TabsContent value="labs" className="mt-8">
              <SubjectGrid subjectList={labSubjects} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
}
