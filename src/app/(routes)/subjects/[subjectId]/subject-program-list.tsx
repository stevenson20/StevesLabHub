"use client"

import React, { useState, useMemo } from 'react';
import type { Program, Subject } from '@/lib/types';
import { ProgramCard } from '@/components/cards/program-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

type SubjectProgramListProps = {
  programs: Program[];
  subject: Subject;
};

export function SubjectProgramList({ programs, subject }: SubjectProgramListProps) {
  const [tagFilter, setTagFilter] = useState('all');
  const [langFilter, setLangFilter] = useState('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    programs.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['all', ...Array.from(tags)];
  }, [programs]);

  const allLangs = useMemo(() => {
    const langs = new Set<string>();
    programs.forEach(p => langs.add(p.language));
    return ['all', ...Array.from(langs)];
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const tagMatch = tagFilter === 'all' || p.tags.includes(tagFilter);
      const langMatch = langFilter === 'all' || p.language === langFilter;
      return tagMatch && langMatch;
    });
  }, [programs, tagFilter, langFilter]);

  return (
    <div>
      <Card className="mb-8 rounded-xl border p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="font-medium text-sm text-muted-foreground">Filters:</span>
          <div className="flex gap-4">
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-lg bg-secondary">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag} className="capitalize">
                    {tag === 'all' ? 'All Tags' : tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={langFilter} onValueChange={setLangFilter}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-lg bg-secondary">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                {allLangs.map(lang => (
                  <SelectItem key={lang} value={lang} className="capitalize">
                    {lang === 'all' ? 'All Languages' : lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {filteredPrograms.map(program => (
                <ProgramCard key={program.id} program={program} subject={subject} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-xl">
            <p className="text-lg">No programs match the current filters.</p>
            <p>Try adjusting your filter selection.</p>
        </div>
      )}
    </div>
  );
}
