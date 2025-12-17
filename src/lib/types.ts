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
}

export interface Note {
  id: string;
  title: string;
  subjectId: string;
  type: 'PDF' | 'Link' | 'Document';
  url: string;
  year: number;
  semester: number;
}

export interface Syllabus {
  id: string;
  title: string;
  subjectId: string;
  type: 'PDF' | 'Link';
  url: string;
  year: number;
  semester: number;
}

export interface Material {
  id: string;
  subjectId: string;
  type: 'Assignment' | 'Question Paper' | 'Notes' | 'Image';
  title: string;
  url: string;
  fileType: 'PDF' | 'Image' | 'Link' | 'Document';
  year: number;
  semester: number;
}
