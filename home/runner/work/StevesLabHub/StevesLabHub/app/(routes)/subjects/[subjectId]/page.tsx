
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { subjects, programs, materials } from '@/lib/data';
import type { Subject, Program, Material } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SubjectPageClient } from './subject-page-client';

function getSubjectData(subjectId: string): { subject: Subject, subjectPrograms: Program[], subjectMaterials: Material[] } | null {
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) {
    return null;
  }
  const subjectPrograms = programs.filter((p) => p.subjectId === subjectId);
  const subjectMaterials = materials.filter((m) => m.subjectId === subjectId);
  return { subject, subjectPrograms, subjectMaterials };
}

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default function SubjectPage({ params, searchParams }: { params: { subjectId: string }, searchParams: { year?: string, sem?: string } }) {
  const data = getSubjectData(params.subjectId);

  if (!data) {
    notFound();
  }

  const { subject, subjectPrograms, subjectMaterials } = data;
  const year = searchParams.year || subject.year;
  const sem = searchParams.sem || subject.semester;

  return (
    <div className="container py-12">
       <Button asChild variant="ghost" className="mb-8">
        <Link href={`/dashboard?year=${year}&sem=${sem}#subjects`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Subjects
        </Link>
      </Button>
      <SubjectPageClient 
        subject={subject}
        subjectPrograms={subjectPrograms}
        subjectMaterials={subjectMaterials}
      />
    </div>
  );
}
