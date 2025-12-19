
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { programs, subjects } from '@/lib/data';
import type { Subject } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProgramDetailClient } from './program-detail-client';

export async function generateStaticParams() {
  return programs.map((program) => ({
    programId: program.id,
  }));
}

export default function ProgramPage({ params }: { params: { programId: string } }) {
  const program = programs.find((p) => p.id === params.programId);

  if (!program) {
    notFound();
  }
  
  const subject = subjects.find(s => s.id === program.subjectId);

  return (
    <div className="container py-12 animate-fade-in">
       <Button asChild variant="ghost" className="mb-8">
        <Link href={`/subjects/${program.subjectId}?year=${program.year}&sem=${program.semester}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {subject?.shortTitle} Programs
        </Link>
      </Button>

      <ProgramDetailClient program={program} subject={subject} />
    </div>
  );
}
