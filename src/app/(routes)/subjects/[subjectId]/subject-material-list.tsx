
"use client"

import React, { useState, useMemo } from 'react';
import type { Material, Subject } from '@/lib/types';
import { MaterialCard } from '@/components/cards/material-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

type SubjectMaterialListProps = {
  materials: Material[];
  subject: Subject;
  filterTypes?: string[];
};

export function SubjectMaterialList({ materials, subject, filterTypes }: SubjectMaterialListProps) {
  const [typeFilter, setTypeFilter] = useState('all');

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    materials.forEach(m => {
        if (!filterTypes || filterTypes.includes(m.type)) {
            types.add(m.type)
        }
    });
    return ['all', ...Array.from(types)];
  }, [materials, filterTypes]);

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const typeMatch = typeFilter === 'all' || m.type === typeFilter;
      const categoryMatch = !filterTypes || filterTypes.includes(m.type);
      return typeMatch && categoryMatch;
    });
  }, [materials, typeFilter, filterTypes]);

  const showFilter = allTypes.length > 2; // Only show filter if there's more than 'all' and one other type

  return (
    <div>
      {showFilter && (
        <Card className="mb-8 rounded-xl border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="font-medium text-sm text-muted-foreground">Filter by type:</span>
            <div className="flex gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[240px] rounded-lg bg-secondary">
                  <SelectValue placeholder="Filter by material type" />
                </SelectTrigger>
                <SelectContent>
                  {allTypes.map(type => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type === 'all' ? 'All' : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
      
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {filteredMaterials.map(material => (
            <MaterialCard key={material.id} material={material} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-xl">
          <p className="text-lg">No materials match the current filters.</p>
          <p>Try adjusting your filter selection.</p>
        </div>
      )}
    </div>
  );
}
