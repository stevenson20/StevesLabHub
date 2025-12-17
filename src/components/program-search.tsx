"use client"

import React, { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Program, Subject } from "@/lib/types"
import { ProgramCard } from "@/components/cards/program-card"

interface ProgramSearchProps {
  programs: Program[]
  subjects: Subject[]
}

export function ProgramSearch({ programs, subjects }: ProgramSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const subjectMap = useMemo(() => {
    const map = new Map<string, Subject>()
    subjects.forEach(subject => map.set(subject.id, subject))
    return map
  }, [subjects])

  const filteredPrograms = useMemo(() => {
    if (!searchTerm) {
      return programs
    }
    const lowercasedTerm = searchTerm.toLowerCase()
    return programs.filter(
      (program) =>
        program.title.toLowerCase().includes(lowercasedTerm) ||
        program.language.toLowerCase().includes(lowercasedTerm) ||
        program.tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
    )
  }, [searchTerm, programs])

  return (
    <div>
      <div className="relative mx-auto mb-8 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for a program, language, or tag..."
          className="w-full rounded-xl py-3 pl-12 h-14 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPrograms.length > 0 ? (
         <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              subject={subjectMap.get(program.subjectId)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No programs found for &quot;{searchTerm}&quot;.</p>
            <p>Try searching for something else.</p>
        </div>
      )}
    </div>
  )
}
