export interface Program {
  id: string;
  title: string;
  language: string;
  tags: string[];
  aim: string;
  code: string;
  canRunInBrowser: boolean;
  subjectId: string;
  year: number;
  semester: number;
  problem: string;
}

export interface Subject {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  color: 'ai' | 'fsd' | 'cn' | 'tinkering' | 'spm' | 'cyber' | 'cloud' | 'ml' | 'writing' | 'speaking' | 'cns' | 'ws' | 'sfs' | 'default';
  hasLab: boolean;
  isLabOnly: boolean;
  year: number;
  semester: number;
  name: string;
  short?: string;
}

export interface Material {
  id: string;
  subjectId: string;
  type: 'Assignment' | 'Question Paper' | 'Notes' | 'Image' | 'Link' | 'Syllabus' | 'PDF' | 'Document';
  title: string;
  url: string;
  fileType: 'PDF' | 'Image' | 'Link' | 'Document';
  year: number;
  semester: number;
}
