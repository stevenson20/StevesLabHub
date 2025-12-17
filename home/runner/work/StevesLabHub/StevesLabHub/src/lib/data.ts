
import type { Subject, Program, Note, Syllabus, Material } from './types';

// Import all data from the new structure
import sem1_1_data from './data/year-1/sem-1.json';
import sem1_2_data from './data/year-1/sem-2.json';
import sem2_1_data from './data/year-2/sem-1.json';
import sem2_2_data from './data/year-2/sem-2.json';

// Year 3, Semester 1
import cs31t1_sub from './data/year-3/sem-1/23CS31T1/subject.json';
import cs31t2_sub from './data/year-3/sem-1/23CS31T2/subject.json';
import cs31t3_sub from './data/year-3/sem-1/23CS31T3/subject.json';
import cs31e4_sub from './data/year-3/sem-1/23CS31E4/subject.json';
import cs31p1_sub from './data/year-3/sem-1/23CS31P1/subject.json';
import cs31p1_prog from './data/year-3/sem-1/23CS31P1/programs.json';
import cs31p2_sub from './data/year-3/sem-1/23CS31P2/subject.json';
import cs31p2_prog from './data/year-3/sem-1/23CS31P2/programs.json';
import ad31sc_sub from './data/year-3/sem-1/23AD31SC/subject.json';
import ad31sc_prog from './data/year-3/sem-1/23AD31SC/programs.json';
import es31p1_sub from './data/year-3/sem-1/23ES31P1/subject.json';
import es31p1_prog from './data/year-3/sem-1/23ES31P1/programs.json';
import es31t1_sub from './data/year-3/sem-1/23ES31T1/subject.json';

// Year 3, Semester 2
import cs32t1_sub from './data/year-3/sem-2/23CS32T1/subject.json';
import cs32t2_sub from './data/year-3/sem-2/23CS32T2/subject.json';
import cs32t3_sub from './data/year-3/sem-2/23CS32T3/subject.json';
import cs32e2_sub from './data/year-3/sem-2/23CS32E2/subject.json';
import cs32p1_sub from './data/year-3/sem-2/23CS32P1/subject.json';
import cs32p1_prog from './data/year-3/sem-2/23CS32P1/programs.json';
import cs32p2_sub from './data/year-3/sem-2/23CS32P2/subject.json';
import cs32ac_sub from './data/year-3/sem-2/23CS32AC/subject.json';
import cs32sc_sub from './data/year-3/sem-2/23CS32SC/subject.json';

// Materials
import materialsData from './materials.json';


const allSemesterData = [
  { year: 1, semester: 1, data: sem1_1_data.subjects },
  { year: 1, semester: 2, data: sem1_2_data.subjects },
  { year: 2, semester: 1, data: sem2_1_data.subjects },
  { year: 2, semester: 2, data: sem2_2_data.subjects },
  { year: 3, semester: 1, data: [cs31t1_sub, cs31t2_sub, cs31t3_sub, cs31e4_sub, cs31p1_sub, cs31p2_sub, ad31sc_sub, es31p1_sub, es31t1_sub] },
  { year: 3, semester: 2, data: [cs32t1_sub, cs32t2_sub, cs32t3_sub, cs32e2_sub, cs32p1_sub, cs32p2_sub, cs32ac_sub, cs32sc_sub] },
];

const allProgramsData = [
    ...cs31p1_prog.map(p => ({...p, subjectId: '23CS31P1'})),
    ...cs31p2_prog.map(p => ({...p, subjectId: '23CS31P2'})),
    ...ad31sc_prog.map(p => ({...p, subjectId: '23AD31SC'})),
    ...es31p1_prog.map(p => ({...p, subjectId: '23ES31P1'})),
    ...cs32p1_prog.map(p => ({...p, subjectId: '23CS32P1'})),
];


const subjectColorMap: Record<string, Subject['color']> = {
  '23A15501': 'speaking', '23A15301': 'cloud', '23A15101': 'ml', '23A11301': 'tinkering', '23A10501': 'fsd', '23A15502': 'speaking', '23A15302': 'cloud', '23A10302': 'tinkering', '23A10502': 'fsd', '23A15901': 'sfs', '23A25201': 'ai', '23A25101': 'ml', '23A22401': 'cn', '23A20302': 'tinkering', '23A20501': 'fsd', '23A25202': 'ai', '23A20501-it': 'ws', '23A22402': 'cn', '23A20503': 'fsd', '23A25902': 'sfs', '23A35105': 'ml', '23A35401a': 'spm', '23A30503': 'cn', '23A30504': 'fsd', '23A30505': 'ai', '23A30506': 'fsd', '23A30507': 'ai', '23A30502': 'fsd', '23A45102': 'ml', '23A40501': 'cn', '23A40502': 'spm', '23A40503': 'writing', '23A40504': 'cn', '23A40505': 'spm', '23A40506': 'fsd', '23A49901': 'tinkering',
  '23CS31T1': 'ai', '23CS31P1': 'ai', '23CS31T2': 'cn', '23CS31P2': 'cn', '23CS31T3': 'fsd', '23CS31E4': 'spm', '23AD31SC': 'fsd', '23ES31P1': 'tinkering', '23ES31T1': 'ai',
  '23CS32T1': 'ml', '23CS32P1': 'ml', '23CS32T3': 'cns', '23CS32P2': 'cns', '23CS32T2': 'cloud', '23CS32E2': 'cyber', '23CS32AC': 'writing', '23CS32SC': 'speaking',
};

const shortTitleMap: Record<string, string> = {
    '23A15501': 'English', '23A15301': 'Chemistry', '23A15101': 'Maths-I', '23A11301': 'BCME', '23A10501': 'C-Prog', '23A15502': 'Eng Lab', '23A15302': 'Chem Lab', '23A10302': 'Workshop', '23A10502': 'C-Prog Lab', '23A15901': 'Yoga', '23A25201': 'Physics', '23A25101': 'Maths-II', '23A22401': 'BEE', '23A20302': 'Graphics', '23A20501': 'DS', '23A25202': 'Physics Lab', '23A20501-it': 'IT Shop', '23A22402': 'BEE Shop', '23A20503': 'DS Lab', '23A25902': 'NSS/NCC', '23A35105': 'DMGT', '23A35401a': 'MEFA', '23A30503': 'DLCO', '23A30504': 'ADSA', '23A30505': 'JAVA', '23A30506': 'ADSA Lab', '23A30507': 'JAVA Lab', '23A30502': 'Python', '23A45102': 'P&S', '23A40501': 'OS', '23A40502': 'DBMS', '23A40503': 'SE', '23A40504': 'OS Lab', '23A40505': 'DBMS Lab', '23A40506': 'FSD', '23A49901': 'Design',
    '23CS31T1': 'AI', '23CS31P1': 'AI Lab', '23CS31T2': 'CN & IP', '23CS31P2': 'CN & IP Lab', '23CS31T3': 'ATCD', '23CS31E4': 'DMDW', '23AD31SC': 'FSD-II', '23ES31P1': 'Tinkering', '23ES31T1': 'Quantum',
    '23CS32T1': 'ML', '23CS32P1': 'ML Lab', '23CS32T3': 'CNS', '23CS32P2': 'CNS Lab', '23CS32T2': 'CC', '23CS32E2': 'CS', '23CS32AC': 'TRW & IPR', '23CS32SC': 'Soft Skills'
};

const finalSubjects: Subject[] = [];
const finalPrograms: Program[] = [];
const finalNotes: Note[] = [];
const finalSyllabi: Syllabus[] = [];
const finalMaterials: Material[] = [];

allSemesterData.forEach(sem => {
    (sem.data as any[]).forEach(s => {
        const subject: Subject = {
            id: s.id,
            title: s.name,
            shortTitle: shortTitleMap[s.id] || s.short || s.name.split(' ')[0],
            description: s.short || s.description || '',
            color: subjectColorMap[s.id] || 'default',
            hasLab: s.hasLab,
            isLabOnly: s.isLabOnly,
            year: sem.year,
            semester: sem.semester,
        };
        finalSubjects.push(subject);
    });
});


allProgramsData.forEach(p => {
    const matchingSubject = finalSubjects.find(s => s.id === p.subjectId);
    if(matchingSubject) {
        finalPrograms.push({
            ...p,
            canRunInBrowser: p.language.toLowerCase() === 'html/css/js',
            aim: p.problem,
            code: p.code || "No code available", // Fallback for missing code
            year: matchingSubject.year,
            semester: matchingSubject.semester,
        } as Program);
    }
});

materialsData.materials.forEach(m => {
    const matchingSubject = finalSubjects.find(s => s.id === m.subjectId);
    if (matchingSubject) {
        finalMaterials.push({
            ...m,
            year: matchingSubject.year,
            semester: matchingSubject.semester,
        } as Material);
    }
});


export const subjects: Subject[] = finalSubjects;
export const programs: Program[] = finalPrograms;
export const materials: Material[] = finalMaterials;
export const syllabi: Syllabus[] = finalSyllabi;
export const notes: Note[] = finalNotes;
