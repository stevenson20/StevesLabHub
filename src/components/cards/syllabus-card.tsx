import type { Syllabus, Subject } from '@/lib/types';
import { cn } from '@/lib/utils';
import { FileText, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type SyllabusCardProps = {
  syllabus: Syllabus;
  subject?: Subject;
};

const subjectColorClasses: Record<string, string> = {
    ai: "bg-subject-ai/10 text-subject-ai border-subject-ai/20",
    fsd: "bg-subject-fsd/10 text-subject-fsd border-subject-fsd/20",
    cn: "bg-subject-cn/10 text-subject-cn border-subject-cn/20",
    tinkering: "bg-subject-tinkering/10 text-subject-tinkering/20",
    spm: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    cyber: "bg-red-500/10 text-red-500 border-red-500/20",
    cloud: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    ml: "bg-green-500/10 text-green-500 border-green-500/20",
    writing: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    speaking: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    cns: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    default: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  };

export function SyllabusCard({ syllabus, subject }: SyllabusCardProps) {
  
  return (
    <div className="group block rounded-xl border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
    <div className="flex items-start justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText/>
      </div>
      <Badge variant="outline" className="rounded-full">{syllabus.type}</Badge>
    </div>
    <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors flex-grow">
      {syllabus.title}
    </h3>
    {subject && (
      <Badge
        className={cn("mt-2 font-medium w-fit", subjectColorClasses[subject.color] || "bg-secondary")}
      >
        {subject.shortTitle}
      </Badge>
    )}
     <Button asChild size="sm" className="mt-4 w-full">
       <a href={syllabus.url} download>
         <Download className="mr-2 h-4 w-4" />
         Download
       </a>
     </Button>
  </div>
  );
}
