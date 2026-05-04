export type Grade = 5 | 6;
export type Semester = 1 | 2;

export interface UnitMeta {
  grade: Grade;
  semester: Semester;
  unitId: string;
  unitNumber: number;
  title: string;
  description: string;
}

export interface UnitQuiz {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation?: string;
}

export interface Unit extends UnitMeta {
  quizzes: UnitQuiz[];
}

export function makeUnitId(grade: Grade, semester: Semester, unitNumber: number): string {
  return `g${grade}-${semester}-${unitNumber}`;
}

export function weightedScore(score: number, survivalTime: number, level: number): number {
  return score + Math.floor(survivalTime) * 10 + level * 100;
}
