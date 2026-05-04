// 학년별 교육과정 통합 내보내기
export { GRADE_1_CURRICULUM } from './grade1';
export { GRADE_2_CURRICULUM } from './grade2';
export { GRADE_3_CURRICULUM } from './grade3';
export { GRADE_4_CURRICULUM } from './grade4';
export { GRADE_5_CURRICULUM } from './grade5';
export { GRADE_6_CURRICULUM } from './grade6';

import { GRADE_1_CURRICULUM } from './grade1';
import { GRADE_2_CURRICULUM } from './grade2';
import { GRADE_3_CURRICULUM } from './grade3';
import { GRADE_4_CURRICULUM } from './grade4';
import { GRADE_5_CURRICULUM } from './grade5';
import { GRADE_6_CURRICULUM } from './grade6';

export type GradeCurriculum = typeof GRADE_1_CURRICULUM;

export const CURRICULUM_BY_GRADE: Record<number, any> = {
  1: GRADE_1_CURRICULUM,
  2: GRADE_2_CURRICULUM,
  3: GRADE_3_CURRICULUM,
  4: GRADE_4_CURRICULUM,
  5: GRADE_5_CURRICULUM,
  6: GRADE_6_CURRICULUM,
};

/**
 * Get curriculum for a specific grade
 */
export function getCurriculum(grade: number): any | null {
  return CURRICULUM_BY_GRADE[grade] || null;
}

/**
 * Get AI prompt guidelines for generating quizzes
 */
export function getAIPromptGuidelines(grade: number): string {
  const curriculum = getCurriculum(grade);
  if (!curriculum) return '';
  return curriculum.aiPromptGuidelines;
}

/**
 * Get math topics for a specific grade
 */
export function getMathTopics(grade: number) {
  const curriculum = getCurriculum(grade);
  if (!curriculum) return [];
  return curriculum.subjects.math.topics;
}

/**
 * Get Korean topics for a specific grade
 */
export function getKoreanTopics(grade: number) {
  const curriculum = getCurriculum(grade);
  if (!curriculum) return [];
  return curriculum.subjects.korean.topics;
}
