import Link from "next/link";
import { Program, Subject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type ProgramCardProps = {
  program: Program;
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
  ws: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  sfs: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  default: "bg-slate-500/10 text-slate-500 border-slate-500/20",
};


export function ProgramCard({ program, subject }: ProgramCardProps) {
  
  return (
    <Link
      href={`/programs/${program.id}`}
      className="group flex flex-col rounded-xl border bg-card p-5 text-left transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex-grow">
        <div className="mb-3 flex items-start justify-between">
          {subject && (
            <Badge
              className={cn(
                "font-semibold",
                subjectColorClasses[subject.color] || "bg-secondary text-secondary-foreground"
              )}
            >
              {subject.shortTitle}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {program.title}
        </h3>
        <p className="text-xs font-medium text-muted-foreground mt-1">{program.language}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {program.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
            {program.canRunInBrowser && (
            <Badge className="bg-primary/10 text-primary border-primary/30 font-medium">
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Runnable
            </Badge>
            )}
        </div>
        <div className="flex items-center text-sm font-medium text-muted-foreground transition-all group-hover:text-primary">
            <span>View</span>
            <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
