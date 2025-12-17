
import type { Subject, Program, Note, Syllabus, Material } from './types';
import programsData from './programs.json';
import materialsData from './materials.json';
import year1sem1 from './data/year-1/sem-1.json';
import year1sem2 from './data/year-1/sem-2.json';
import year2sem1 from './data/year-2/sem-1.json';
import year2sem2 from './data/year-2/sem-2.json';
import year3sem1 from './data/year-3/sem-1.json';
import year3sem2 from './data/year-3/sem-2.json';

const allYearSubjects = [
    ...year1sem1.subjects,
    ...year1sem2.subjects,
    ...year2sem1.subjects,
    ...year2sem2.subjects,
    ...year3sem1.subjects,
    ...year3sem2.subjects,
];

const subjectColorMap: Record<string, Subject['color']> = {
  'ai-lab': 'ai',
  'fsd-lab-2': 'fsd',
  'cn-ip-lab': 'cn',
  'tinkering-lab': 'tinkering',
  'spm': 'spm',
  'cyber-security': 'cyber',
  'cloud-computing': 'cloud',
  'ml': 'ml',
  'tpw-ipr': 'writing',
  'aw-ps': 'speaking',
  'cns': 'cns',
  'ws': 'ws',
  'sfs': 'sfs',
  '23A15501': 'speaking', // Communicative English
  '23A15301': 'cloud', // Chemistry
  '23A15101': 'ml', // Linear Algebra & Calculus
  '23A11301': 'tinkering', // Basic Civil & Mechanical Engineering
  '23A10501': 'fsd', // Introduction to Programming
  '23A15502': 'speaking', // Communicative English Lab
  '23A15302': 'cloud', // Chemistry Lab
  '23A10302': 'tinkering', // Engineering Workshop
  '23A10502': 'fsd', // Computer Programming Lab
  '23A15901': 'sfs', // Health and wellness, Yoga and sports
  '23A25201': 'ai', // Engineering Physics
  '23A25101': 'ml', // Differential Equations and Vector Calculus
  '23A22401': 'cn', // Basic Electrical and Electronics Engineering
  '23A20302': 'tinkering', // Engineering Graphics
  '23A20501': 'fsd', // Data Structures
  '23A25202': 'ai', // Engineering Physics Lab
  '23A20501-it': 'ws', // IT Work Shop - custom id
  '23A22402': 'cn', // Electrical and Electronics Engineering Workshop
  '23A20503': 'fsd', // Data Structures -Lab
  '23A25902': 'sfs', // NSS/NCC /SCOUTS and Guides/ Community Service
  '23A35105': 'ml',
  '23A35401a': 'spm',
  '23A30503': 'cn',
  '23A30504': 'fsd',
  '23A30505': 'ai',
  '23A30506': 'fsd',
  '23A30507': 'ai',
  '23A30502': 'fsd',
  '23A45102': 'ml',
  '23A40501': 'cn',
  '23A40502': 'spm',
  '23A40503': 'writing',
  '23A40504': 'cn',
  '23A40505': 'spm',
  '23A40506': 'fsd',
  '23A49901': 'tinkering',
  '23CS31T1': 'ai',
  '23CS31P1': 'ai',
  '23CS31T2': 'cn',
  '23CS31P2': 'cn',
  '23CS31T3': 'fsd',
  '23CS31E4': 'spm',
  '23AD31SC': 'fsd',
  '23ES31P1': 'tinkering',
  '23ES31T1': 'ai',
  '23CS32T1': 'ml',
  '23CS32P1': 'ml',
  '23CS32T3': 'cns',
  '23CS32P2': 'cns',
  '23CS32T2': 'cloud',
  '23CS32E2': 'cyber',
  '23CS32AC': 'writing',
  '23CS32SC': 'speaking',
};

const shortTitleMap: Record<string, string> = {
    'ai-lab': 'AI Lab',
    'fsd-lab-2': 'FSD-II',
    'cn-ip-lab': 'CN & IP Lab',
    'tinkering-lab': 'Tinkering',
    'spm': 'SPM',
    'cyber-security': 'Cyber Sec',
    'cloud-computing': 'Cloud',
    'ml': 'ML',
    'tpw-ipr': 'TPW',
    'aw-ps': 'AWPS',
    'cns': 'CNS',
    'ws': 'W.S',
    'sfs': 'SFS',
    '23A15501': 'English',
    '23A15301': 'Chemistry',
    '23A15101': 'Maths-I',
    '23A11301': 'BCME',
    '23A10501': 'C-Prog',
    '23A15502': 'Eng Lab',
    '23A15302': 'Chem Lab',
    '23A10302': 'Workshop',
    '23A10502': 'C-Prog Lab',
    '23A15901': 'Yoga',
    '23A25201': 'Physics',
    '23A25101': 'Maths-II',
    '23A22401': 'BEE',
    '23A20302': 'Graphics',
    '23A20501': 'DS',
    '23A25202': 'Physics Lab',
    '23A20501-it': 'IT Shop',
    '23A22402': 'BEE Shop',
    '23A20503': 'DS Lab',
    '23A25902': 'NSS/NCC',
    '23A35105': 'DMGT',
    '23A35401a': 'MEFA',
    '23A30503': 'DLCO',
    '23A30504': 'ADSA',
    '23A30505': 'JAVA',
    '23A30506': 'ADSA Lab',
    '23A30507': 'JAVA Lab',
    '23A30502': 'Python',
    '23A45102': 'P&S',
    '23A40501': 'OS',
    '23A40502': 'DBMS',
    '23A40503': 'SE',
    '23A40504': 'OS Lab',
    '23A40505': 'DBMS Lab',
    '23A40506': 'FSD',
    '23A49901': 'Design',
    '23CS31T1': 'AI',
    '23CS31P1': 'AI Lab',
    '23CS31T2': 'CN & IP',
    '23CS31P2': 'CN & IP Lab',
    '23CS31T3': 'ATCD',
    '23CS31E4': 'DMDW',
    '23AD31SC': 'FSD-II',
    '23ES31P1': 'Tinkering',
    '23ES31T1': 'Quantum',
    '23CS32T1': 'ML',
    '23CS32P1': 'ML Lab',
    '23CS32T3': 'CNS',
    '23CS32P2': 'CNS Lab',
    '23CS32T2': 'CC',
    '23CS32E2': 'CS',
    '23CS32AC': 'TRW & IPR',
    '23CS32SC': 'Soft Skills'
};


const combinedSubjectsRaw = [...allYearSubjects];
const subjectMap = new Map<string, Subject>();

combinedSubjectsRaw.forEach(s => {
    if (!subjectMap.has(s.id)) {
        subjectMap.set(s.id, {
            id: s.id,
            title: s.name,
            shortTitle: shortTitleMap[s.id] || s.short || s.name.split(' ')[0],
            description: s.short || '',
            color: subjectColorMap[s.id] || 'default',
            hasLab: s.hasLab,
            isLabOnly: s.isLabOnly,
            year: s.year,
            semester: s.semester,
        });
    }
});


export const subjects: Subject[] = Array.from(subjectMap.values());

export const programs: Program[] = programsData.programs.map(p => {
      const sub = subjectMap.get(p.subjectId);
      return {
        id: p.id,
        title: p.title,
        language: p.language,
        tags: p.tags,
        aim: p.problem,
        code: p.code,
        canRunInBrowser: p.language.toLowerCase() === 'html/css/js',
        subjectId: p.subjectId,
        year: sub?.year || 0,
        semester: sub?.semester || 0,
      };
  });

let noteIdCounter = 1;
export const notes: Note[] = (programsData.notes || []).map(n => {
    const matchingSubject = subjects.find(s => s.shortTitle.toLowerCase() === n.subject.toLowerCase() || s.title.toLowerCase().includes(n.subject.toLowerCase()));
    return {
        id: `note-${noteIdCounter++}`,
        title: n.title,
        subjectId: matchingSubject ? matchingSubject.id : 'tinkering-lab',
        type: n.type as 'PDF' | 'Link' | 'Document',
        url: n.url,
        year: matchingSubject?.year || 4,
        semester: matchingSubject?.semester || 1,
    };
});

export const syllabi: Syllabus[] = (programsData.syllabi || []).map(s => {
    const matchingSubject = subjects.find(subj => subj.id === s.subjectId);
    return {
        id: s.id,
        title: s.title,
        subjectId: s.subjectId,
        type: s.type as 'PDF' | 'Link',
        url: s.url,
        year: matchingSubject?.year || 1,
        semester: matchingSubject?.semester || 1,
    };
});

export const materials: Material[] = materialsData.materials.map(m => {
    const matchingSubject = subjects.find(s => s.id === m.subjectId);
    return {
        ...m,
        year: matchingSubject?.year || 4,
        semester: matchingSubject?.semester || 1,
    } as Material;
});
