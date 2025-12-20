
import type { Subject, Program, Material, Syllabus, Note } from './types';

// Year 3, Semester 1
import y3s1_23AD31SC_sub from './data/year-3/sem-1/23AD31SC/subject.json';
import y3s1_23AD31SC_prog from './data/year-3/sem-1/23AD31SC/programs.json';
import y3s1_23CS31E1_sub from './data/year-3/sem-1/23CS31E1/subject.json';
import y3s1_23CS31E1_prog from './data/year-3/sem-1/23CS31E1/programs.json';
import y3s1_23CS31E2_sub from './data/year-3/sem-1/23CS31E2/subject.json';
import y3s1_23CS31E2_prog from './data/year-3/sem-1/23CS31E2/programs.json';
import y3s1_23CS31E3_sub from './data/year-3/sem-1/23CS31E3/subject.json';
import y3s1_23CS31E3_prog from './data/year-3/sem-1/23CS31E3/programs.json';
import y3s1_23CS31E4_sub from './data/year-3/sem-1/23CS31E4/subject.json';
import y3s1_23CS31E4_prog from './data/year-3/sem-1/23CS31E4/programs.json';
import y3s1_23CS31O1_sub from './data/year-3/sem-1/23CS31O1/subject.json';
import y3s1_23CS31O1_prog from './data/year-3/sem-1/23CS31O1/programs.json';
import y3s1_23CS31O2_sub from './data/year-3/sem-1/23CS31O2/subject.json';
import y3s1_23CS31O2_prog from './data/year-3/sem-1/23CS31O2/programs.json';
import y3s1_23CS31P1_sub from './data/year-3/sem-1/23CS31P1/subject.json';
import y3s1_23CS31P1_prog from './data/year-3/sem-1/23CS31P1/programs.json';
import y3s1_23CS31P2_sub from './data/year-3/sem-1/23CS31P2/subject.json';
import y3s1_23CS31P2_prog from './data/year-3/sem-1/23CS31P2/programs.json';
import y3s1_23CS31T1_sub from './data/year-3/sem-1/23CS31T1/subject.json';
import y3s1_23CS31T1_prog from './data/year-3/sem-1/23CS31T1/programs.json';
import y3s1_23CS31T2_sub from './data/year-3/sem-1/23CS31T2/subject.json';
import y3s1_23CS31T2_prog from './data/year-3/sem-1/23CS31T2/programs.json';
import y3s1_23CS31T3_sub from './data/year-3/sem-1/23CS31T3/subject.json';
import y3s1_23CS31T3_prog from './data/year-3/sem-1/23CS31T3/programs.json';
import y3s1_23ES31P1_sub from './data/year-3/sem-1/23ES31P1/subject.json';
import y3s1_23ES31P1_prog from './data/year-3/sem-1/23ES31P1/programs.json';
import y3s1_23ES31T1_sub from './data/year-3/sem-1/23ES31T1/subject.json';
import y3s1_23ES31T1_prog from './data/year-3/sem-1/23ES31T1/programs.json';

// Year 3, Semester 2
import y3s2_23CS32AC_sub from './data/year-3/sem-2/23CS32AC/subject.json';
import y3s2_23CS32AC_prog from './data/year-3/sem-2/23CS32AC/programs.json';
import y3s2_23CS32P1_sub from './data/year-3/sem-2/23CS32P1/subject.json';
import y3s2_23CS32P1_prog from './data/year-3/sem-2/23CS32P1/programs.json';
import y3s2_23CS32P2_sub from './data/year-3/sem-2/23CS32P2/subject.json';
import y3s2_23CS32P2_prog from './data/year-3/sem-2/23CS32P2/programs.json';
import y3s2_23CS32SC_sub from './data/year-3/sem-2/23CS32SC/subject.json';
import y3s2_23CS32SC_prog from './data/year-3/sem-2/23CS32SC/programs.json';
import y3s2_23CS32T1_sub from './data/year-3/sem-2/23CS32T1/subject.json';
import y3s2_23CS32T1_prog from './data/year-3/sem-2/23CS32T1/programs.json';
import y3s2_23CS32T2_sub from './data/year-3/sem-2/23CS32T2/subject.json';
import y3s2_23CS32T2_prog from './data/year-3/sem-2/23CS32T2/programs.json';
import y3s2_23CS32T3_sub from './data/year-3/sem-2/23CS32T3/subject.json';
import y3s2_23CS32T3_prog from './data/year-3/sem-2/23CS32T3/programs.json';
import y3s2_23CS32E2_sub from './data/year-3/sem-2/23CS32E2/subject.json';
import y3s2_23CS32E2_prog from './data/year-3/sem-2/23CS32E2/programs.json';

// All materials data is now embedded here to prevent JSON parsing errors.
const materialsData = {
  "materials": [
    {
      "id": "mat-ai-assign-1",
      "subjectId": "23CS31P1",
      "type": "Assignment",
      "title": "AI Assignment 1: Search Algorithms",
      "url": "/materials/ai-assignment-1.pdf",
      "fileType": "PDF"
    },
    {
      "id": "mat-cn-mid-1-2023",
      "subjectId": "23CS31P2",
      "type": "Question Paper",
      "title": "CN & IP Mid Term 1 Question Paper (2023)",
      "url": "/materials/cn-mid-1-2023.pdf",
      "fileType": "PDF"
    },
    {
      "id": "mat-trw-ipr-tinkercad-manual",
      "subjectId": "23CS32AC",
      "type": "Notes",
      "title": "Tinkercad Lab Manual – TRW & IPR",
      "url": "/materials/trw-ipr-tinkercad-manual.pdf",
      "fileType": "PDF"
    },
    {
      "id": "mat-dwm-all-units-assignments",
      "subjectId": "23CS31E4",
      "type": "Assignment",
      "title": "DW&M All Units Assignment Questions (2025–26) – R23",
      "url": "/materials/dwm-assignments-r23.pdf",
      "fileType": "PDF"
    },
    {
      "id": "mat-dwm-model-paper-2025-26",
      "subjectId": "23CS31E4",
      "type": "Question Paper",
      "title": "DW&M (R23) Model Paper (2025–26)",
      "url": "/materials/dwm-model-paper-r23.pdf",
      "fileType": "PDF"
    },
    {
      "id": "note-tinker-manual",
      "subjectId": "23ES31P1",
      "type": "Notes",
      "title": "Tinkercad Lab Manual (Complete)",
      "url": "/materials/tinkercad-lab-manual.pdf",
      "fileType": "PDF"
    },
    {
      "id": "note-tinker-sim-temp",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Temp & Humidity Monitor Simulation",
      "url": "https://www.tinkercad.com/things/jCoseKCUo3i-20-dht11-temperature-and-humidity-sensor",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-water",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Water Level Alert System Simulation",
      "url": "https://www.tinkercad.com/things/9DZbcf79kT8-",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-plant",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Automatic Plant Watering Simulation",
      "url": "https://www.tinkercad.com/things/2cTfQT7fAno-automated-plant-watering-system",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-door",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Door Lock System Simulation",
      "url": "https://www.tinkercad.com/things/cMDBAUzuXqA-door-lock",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-dustbin",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Smart Dustbin Simulation",
      "url": "https://www.tinkercad.com/embed/kxwoGlM7BNY?editbtn=1",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-fire",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Fire Detection System Simulation",
      "url": "https://www.tinkercad.com/things/2X0n2iTvhY2-fire-alarm-system",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-soil",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Soil Moisture Irrigation Simulation",
      "url": "https://www.tinkercad.com/things/eKtHRRkOZoA-",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-helmet",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Smart Helmet Simulation",
      "url": "https://www.tinkercad.com/things/h7qvsrFRx9G-accident-prevention-and-detection",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-reactor",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "Temp Controlled Reactor Simulation",
      "url": "https://www.tinkercad.com/things/fndGND1saJ4-automatic-room-temperature-controller",
      "fileType": "Link"
    },
    {
      "id": "note-tinker-sim-ecg",
      "subjectId": "23ES31P1",
      "type": "Link",
      "title": "ECG Signal Acquisition Simulation",
      "url": "https://www.tinkercad.com/things/hbXyygH4jbr-portable-electrocardiograph-ecg",
      "fileType": "Link"
    },
    {
      "id": "syllabus-ai-lab",
      "subjectId": "23CS31P1",
      "type": "Syllabus",
      "title": "AI Lab Syllabus",
      "url": "/syllabi/ai-lab-syllabus.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-cs",
      "subjectId": "23CS32E2",
      "type": "Syllabus",
      "title": "Cyber Security Syllabus",
      "url": "/syllabi/cyber-security-syllabus.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-iqta",
      "subjectId": "23ES31T1",
      "type": "Syllabus",
      "title": "Introduction to Quantum Technologies and Applications – Syllabus",
      "url": "/materials/23ES31T1-INTRODUCTION_TO_QUANTUM_TECHNOLOGIES_AND_APPLICATIONS.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-dwdm",
      "subjectId": "23CS31E4",
      "type": "Syllabus",
      "title": "Data Mining & Data Warehousing – Syllabus",
      "url": "/materials/23CS31E4-DATA_MINING_&_DATA_WAREHOUSING.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-ai-theory",
      "subjectId": "23CS31T1",
      "type": "Syllabus",
      "title": "Artificial Intelligence – Syllabus",
      "url": "/materials/23CS31T1-ARTIFICIAL_INTELLIGENCE.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-atcd",
      "subjectId": "23CS31T3",
      "type": "Syllabus",
      "title": "Automata Theory and Compiler Design – Syllabus",
      "url": "/materials/23CS31T3-AUTOMATA_THEORY_AND_COMPILER_DESIGN.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-cnip",
      "subjectId": "23CS31T2",
      "type": "Syllabus",
      "title": "Computer Networks & Internet Protocols – Syllabus",
      "url": "/materials/23CS31T2-COMPUTER_NETWORKS_&_INTERNET_PROTOCOLS.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-trw-ipr",
      "subjectId": "23CS32AC",
      "type": "Syllabus",
      "title": "Technical Report Writing & IPR – Syllabus",
      "url": "/materials/23CS32AC-TECHNICAL_REPORT_WRITING_&_IPR.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-ml-lab",
      "subjectId": "23CS32P1",
      "type": "Syllabus",
      "title": "Machine Learning Lab – Syllabus",
      "url": "/materials/23CS32P1-MACHINE_LEARNING_LAB.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-cns-lab",
      "subjectId": "23CS32P2",
      "type": "Syllabus",
      "title": "Cryptography & Network Security Lab – Syllabus",
      "url": "/materials/23CS32P2-CRYPTOGRAPHY_AND_NETWORK_SECURITY_LAB.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-soft-skills",
      "subjectId": "23CS32SC",
      "type": "Syllabus",
      "title": "Soft Skills – Syllabus",
      "url": "/materials/23CS32SC-SOFT_SKILLS.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-ml-theory",
      "subjectId": "23CS32T1",
      "type": "Syllabus",
      "title": "Machine Learning – Syllabus",
      "url": "/materials/23CS32T1-MACHINE_LEARNING.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-cloud",
      "subjectId": "23CS32T2",
      "type": "Syllabus",
      "title": "Cloud Computing – Syllabus",
      "url": "/materials/23CS32T2-CLOUD_COMPUTING.pdf",
      "fileType": "PDF"
    },
    {
      "id": "syllabus-cns-theory",
      "subjectId": "23CS32T3",
      "type": "Syllabus",
      "title": "Cryptography & Network Security – Syllabus",
      "url": "/materials/23CS32T3-CRYPTOGRAPHY_AND_NETWORK_SECURITY.pdf",
      "fileType": "PDF"
    }
  ]
};

const allSubjectsData: { subject: Subject; programs: Omit<Program, 'subjectId' | 'year' | 'semester'>[] }[] = [
    // --- Year 3, Semester 1 ---
    { subject: y3s1_23AD31SC_sub, programs: y3s1_23AD31SC_prog },
    { subject: y3s1_23CS31E1_sub, programs: y3s1_23CS31E1_prog },
    { subject: y3s1_23CS31E2_sub, programs: y3s1_23CS31E2_prog },
    { subject: y3s1_23CS31E3_sub, programs: y3s1_23CS31E3_prog },
    { subject: y3s1_23CS31E4_sub, programs: y3s1_23CS31E4_prog },
    { subject: y3s1_23CS31O1_sub, programs: y3s1_23CS31O1_prog },
    { subject: y3s1_23CS31O2_sub, programs: y3s1_23CS31O2_prog },
    { subject: y3s1_23CS31P1_sub, programs: y3s1_23CS31P1_prog },
    { subject: y3s1_23CS31P2_sub, programs: y3s1_23CS31P2_prog },
    { subject: y3s1_23CS31T1_sub, programs: y3s1_23CS31T1_prog },
    { subject: y3s1_23CS31T2_sub, programs: y3s1_23CS31T2_prog },
    { subject: y3s1_23CS31T3_sub, programs: y3s1_23CS31T3_prog },
    { subject: y3s1_23ES31P1_sub, programs: y3s1_23ES31P1_prog },
    { subject: y3s1_23ES31T1_sub, programs: y3s1_23ES31T1_prog },
    // --- Year 3, Semester 2 ---
    { subject: y3s2_23CS32AC_sub, programs: y3s2_23CS32AC_prog },
    { subject: y3s2_23CS32P1_sub, programs: y3s2_23CS32P1_prog },
    { subject: y3s2_23CS32P2_sub, programs: y3s2_23CS32P2_prog },
    { subject: y3s2_23CS32SC_sub, programs: y3s2_23CS32SC_prog },
    { subject: y3s2_23CS32T1_sub, programs: y3s2_23CS32T1_prog },
    { subject: y3s2_23CS32T2_sub, programs: y3s2_23CS32T2_prog },
    { subject: y3s2_23CS32T3_sub, programs: y3s2_23CS32T3_prog },
    { subject: y3s2_23CS32E2_sub, programs: y3s2_23CS32E2_prog },
];

const subjectColorMap: Record<string, Subject['color']> = {
    '23AD31SC': 'fsd', '23CS31P1': 'ai', '23CS31P2': 'cn', '23ES31P1': 'tinkering',
    '23CS31T1': 'ai', '23CS31T2': 'cn', '23CS31T3': 'atcd', '23CS31E4': 'spm', '23ES31T1': 'default',
    '23CS32AC': 'writing', '23CS32P1': 'ml', '23CS32P2': 'cns', '23CS32SC': 'speaking',
    '23CS32T1': 'ml', '23CS32T2': 'cloud', '23CS32T3': 'cns', '23CS32E2': 'cyber',
    '23CS31E1': 'ooad', '23CS31E2': 'default', '23CS31E3': 'mpmc', 
    '23CS31O1': 'default', '23CS31O2': 'ai'
};

const shortTitleMap: Record<string, string> = {
    '23AD31SC': 'FSD-II', '23CS31E1': 'OOAD', '23CS31E2': 'Soft Computing', '23CS31E3': 'MPMC', '23CS31E4': 'DWDM',
    '23CS31O1': 'Java', '23CS31O2': 'Intro AI', '23CS31P1': 'AI Lab', '23CS31P2': 'CN & IP Lab', '23CS31T1': 'AI',
    '23CS31T2': 'CN & IP', '23CS31T3': 'ATCD', '23ES31P1': 'Tinkering', '23ES31T1': 'IQTA',
    '23CS32AC': 'TRW & IPR', '23CS32P1': 'ML Lab', '23CS32P2': 'CNS Lab', '23CS32SC': 'Soft Skills', '23CS32T1': 'ML',
    '23CS32T2': 'CC', '23CS32T3': 'CNS', '23CS32E2': 'CS'
};

let processedSubjects: Subject[] = [];
let processedPrograms: Program[] = [];

allSubjectsData.forEach(data => {
    const subjectInfo = data.subject as any;
    
    const subject: Subject = {
        ...subjectInfo,
        title: subjectInfo.name,
        shortTitle: shortTitleMap[subjectInfo.id] || subjectInfo.short || subjectInfo.name.split(' ')[0],
        description: subjectInfo.short,
        color: subjectColorMap[subjectInfo.id] || 'default'
    };
    processedSubjects.push(subject);

    const subjectPrograms: Program[] = (data.programs as any[]).map((p: any) => ({
        ...p,
        subjectId: subject.id,
        year: subject.year,
        semester: subject.semester,
        aim: p.problem,
        canRunInBrowser: p.language?.toLowerCase() === 'html/css/js',
        language: p.language || 'N/A',
        tags: p.tags || [],
        code: p.code || 'No code available.'
    }));
    processedPrograms.push(...subjectPrograms);
});


export const subjects: Subject[] = processedSubjects;
export const programs: Program[] = processedPrograms;

const subjectMap = new Map(subjects.map(s => [s.id, s]));

export const materials: Material[] = materialsData.materials.map((m: any) => {
    const sub = subjectMap.get(m.subjectId);
    return {
        ...m,
        year: sub?.year ?? 0,
        semester: sub?.semester ?? 0,
    };
}).filter((m: any) => m.year !== 0);

export const notes: Note[] = [];
export const syllabi: Syllabus[] = [];
