import type { Grade, Semester, Unit, UnitMeta } from './types';
import { GRADE_5_SEMESTER_1 } from './grade5-1';
import { GRADE_5_SEMESTER_2 } from './grade5-2';
import { GRADE_6_SEMESTER_1 } from './grade6-1';
import { GRADE_6_SEMESTER_2 } from './grade6-2';

export type { Grade, Semester, Unit, UnitMeta };
export { makeUnitId, weightedScore } from './types';
export type { UnitQuiz } from './types';

export const ALL_UNITS: Unit[] = [
  ...GRADE_5_SEMESTER_1,
  ...GRADE_5_SEMESTER_2,
  ...GRADE_6_SEMESTER_1,
  ...GRADE_6_SEMESTER_2,
];

const UNIT_INDEX = new Map<string, Unit>(ALL_UNITS.map((u) => [u.unitId, u]));

export function getUnit(unitId: string): Unit | null {
  return UNIT_INDEX.get(unitId) ?? null;
}

export function getUnitsByGradeSemester(grade: Grade, semester: Semester): Unit[] {
  return ALL_UNITS.filter((u) => u.grade === grade && u.semester === semester);
}

export function listUnitMeta(): UnitMeta[] {
  return ALL_UNITS.map(({ quizzes: _q, ...meta }) => meta);
}

export const SUPPORTED_GRADES: Grade[] = [5, 6];
export const SUPPORTED_SEMESTERS: Semester[] = [1, 2];
