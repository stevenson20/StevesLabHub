
"use client";

import type { Material, Subject } from '@/lib/types';
import { cn, getAssetPath } from '@/lib/utils';
import { FileText, Download, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

type MaterialCardProps = {
  material: Material;
  subject?: Subject;
};

const fileTypeConfig = {
  PDF: { icon: <FileText />, color: 'bg-destructive/10 text-destructive' },
  Image: { icon: <ImageIcon />, color: 'bg-sky-500/10 text-sky-500' },
  Link: { icon: <LinkIcon />, color: 'bg-primary/10 text-primary' },
  Document: { icon: <FileText />, color: 'bg-yellow-500/10 text-yellow-500' },
  'Question Paper': { icon: <FileText />, color: 'bg-purple-500/10 text-purple-500' },
  'Assignment': { icon: <FileText />, color: 'bg-orange-500/10 text-orange-500' },
  'Notes': { icon: <FileText />, color: 'bg-blue-500/10 text-blue-500' },
  'Syllabus': { icon: <FileText />, color: 'bg-indigo-500/10 text-indigo-500' },
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

export function MaterialCard({ material, subject }: MaterialCardProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const config = fileTypeConfig[material.type as keyof typeof fileTypeConfig] || fileTypeConfig.Document;
  const canBeViewed = material.fileType === 'PDF' || material.fileType === 'Image';
  const assetUrl = getAssetPath(material.url);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canBeViewed) {
      setIsViewerOpen(true);
    }
  };

  const CardUI = (
      <div className="group block rounded-xl border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <div className="flex items-start justify-between">
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", config.color)}>
            {config.icon}
          </div>
          <Badge variant="outline" className="rounded-full">{material.type}</Badge>
        </div>
        <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors flex-grow">
          {material.title}
        </h3>
        {subject && (
          <Badge
            className={cn("mt-2 font-medium w-fit", subjectColorClasses[subject.color || 'default'])}
          >
            {subject.shortTitle}
          </Badge>
        )}
        <div className="flex-grow" />
        
        {canBeViewed ? (
             <Button onClick={handleAction} size="sm" className="mt-4 w-full z-10">
                View
             </Button>
        ) : (
            <Button asChild size="sm" className="mt-4 w-full z-10">
                <a href={assetUrl} download={material.fileType !== 'Link'} target={material.fileType === 'Link' ? '_blank' : '_self'} rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {material.fileType === 'Link' ? 'Open Link' : 'Download'}
                </a>
            </Button>
        )}
      </div>
  );

  const Wrapper = canBeViewed ? 'div' : Link;
  const wrapperProps = canBeViewed 
    ? { className: "h-full", onClick: handleAction, style:{cursor: 'pointer'} } 
    : { href: assetUrl, target: "_blank", rel: "noopener noreferrer", className: "h-full" };

  return (
    <>
      <Wrapper {...wrapperProps}>
        {CardUI}
      </Wrapper>
      {canBeViewed && (
        <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
          <DialogContent className="max-w-5xl h-[90vh] p-0 animate-scale-in flex flex-col">
            <DialogHeader className="p-4 border-b flex-shrink-0">
              <DialogTitle>{material.title}</DialogTitle>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state-open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex-1 overflow-auto">
              {material.fileType === 'PDF' ? (
                 <iframe
                    src={assetUrl}
                    title={material.title}
                    className="h-full w-full border-0"
                  />
              ) : material.fileType === 'Image' ? (
                <div className="flex items-center justify-center h-full p-4">
                  <img
                    src={assetUrl}
                    alt={material.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
