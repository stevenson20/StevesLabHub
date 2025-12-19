"use client"

import { Subject, Program, Material } from '@/lib/types';
import { Book, Code, FileText } from 'lucide-react';
import { SubjectMaterialList } from './subject-material-list';
import { Separator } from '@/components/ui/separator';
import { SubjectProgramList } from './subject-program-list';
import { Button } from '@/components/ui/button';

interface SubjectPageClientProps {
    subject: Subject;
    subjectPrograms: Program[];
    subjectMaterials: Material[];
}

export function SubjectPageClient({ subject, subjectPrograms, subjectMaterials }: SubjectPageClientProps) {

  const syllabi = subjectMaterials.filter(m => m.type === 'Syllabus');
  const otherMaterials = subjectMaterials.filter(m => m.type !== 'Syllabus');

  const colorClasses: Record<string, string> = {
    ai: 'text-subject-ai',
    fsd: 'text-subject-fsd',
    cn: 'text-subject-cn',
    tinkering: 'text-subject-tinkering',
    spm: 'text-purple-500',
    cyber: 'text-red-500',
    cloud: 'text-blue-500',
    ml: 'text-green-500',
    writing: 'text-yellow-500',
    speaking: 'text-orange-500',
    cns: 'text-pink-500',
    ws: 'text-indigo-500',
    sfs: 'text-teal-500',
    mpmc: 'text-rose-500',
    atcd: 'text-sky-500',
    ooad: 'text-amber-500',
    default: 'text-foreground'
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className={colorClasses[subject.color || 'default']}>{subject.shortTitle}</span>
          <span className="text-foreground">: {subject.title}</span>
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{subject.description}</p>
      </div>

       <div className="mb-12 flex flex-wrap gap-4">
        {subject.hasLab && subjectPrograms.length > 0 && (
          <Button asChild variant="outline">
            <a href="#lab-programs">
              <Code className="mr-2 h-4 w-4" />
              Lab Programs
            </a>
          </Button>
        )}
        {otherMaterials.length > 0 && (
          <Button asChild variant="outline">
            <a href="#study-materials">
              <Book className="mr-2 h-4 w-4" />
              Study Materials
            </a>
          </Button>
        )}
        {syllabi.length > 0 && (
            <Button asChild variant="outline">
                <a href="#syllabus">
                <FileText className="mr-2 h-4 w-4" />
                Syllabus
                </a>
            </Button>
        )}
      </div>

      {subject.hasLab && subjectPrograms.length > 0 && (
        <section id="lab-programs" className="scroll-mt-20">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Lab Programs</h2>
          <SubjectProgramList programs={subjectPrograms} subject={subject} />
        </section>
      )}

      {otherMaterials.length > 0 && (
        <section id="study-materials" className="scroll-mt-20">
          <Separator className="my-12" />
          <h2 className="text-2xl font-bold tracking-tight mb-4">Study Materials</h2>
          <SubjectMaterialList materials={otherMaterials} subject={subject} />
        </section>
      )}

       {syllabi.length > 0 && (
        <section id="syllabus" className="scroll-mt-20">
          <Separator className="my-12" />
          <h2 className="text-2xl font-bold tracking-tight mb-4">Syllabus</h2>
          <SubjectMaterialList materials={syllabi} subject={subject} />
        </section>
      )}

      {(!subject.hasLab && subjectMaterials.length === 0) && (subjectPrograms.length === 0) && (
         <div className="text-center py-16 text-muted-foreground bg-card rounded-xl">
          <p className="text-lg font-semibold">No content available for this subject yet.</p>
          <p>Check back later for updates or explore other subjects.</p>
        </div>
      )}
    </>
  );
}
