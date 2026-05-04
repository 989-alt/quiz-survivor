import { create } from 'zustand';
import type { Quiz, QuizSet, QuizResult } from '../types/quiz';
import { getUnit } from '../data/units';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface QuizState {
  currentQuizSet: QuizSet | null;
  currentQuizIndex: number;
  quizResults: QuizResult[];

  loadUnitQuizzes: (unitId: string) => boolean;
  getCurrentQuiz: () => Quiz | null;
  submitAnswer: (selectedIndex: number, timeSpent: number) => boolean;
  nextQuiz: () => boolean;
  getQuizResults: () => QuizResult[];
  resetQuizSession: () => void;
}

export const useQuizStore = create<QuizState>()((set, get) => ({
  currentQuizSet: null,
  currentQuizIndex: 0,
  quizResults: [],

  loadUnitQuizzes: (unitId: string) => {
    const unit = getUnit(unitId);
    if (!unit || unit.quizzes.length === 0) {
      set({ currentQuizSet: null, currentQuizIndex: 0, quizResults: [] });
      return false;
    }

    const shuffled = shuffle(unit.quizzes);
    const quizzes: Quiz[] = shuffled.map((q) => ({
      id: q.id,
      question: q.question,
      options: [...q.options],
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      difficulty: 'medium',
      category: unit.title,
    }));

    const set_: QuizSet = {
      id: `unit-${unitId}-${Date.now()}`,
      title: `${unit.grade}학년 ${unit.semester}학기 ${unit.unitNumber}단원: ${unit.title}`,
      quizzes,
      createdAt: Date.now(),
    };

    set({ currentQuizSet: set_, currentQuizIndex: 0, quizResults: [] });
    return true;
  },

  getCurrentQuiz: () => {
    const { currentQuizSet, currentQuizIndex } = get();
    if (!currentQuizSet || currentQuizSet.quizzes.length === 0) return null;
    const idx = currentQuizIndex % currentQuizSet.quizzes.length;
    return currentQuizSet.quizzes[idx];
  },

  submitAnswer: (selectedIndex: number, timeSpent: number) => {
    const quiz = get().getCurrentQuiz();
    if (!quiz) return false;
    const isCorrect = selectedIndex === quiz.correctIndex;
    const result: QuizResult = {
      quizId: quiz.id,
      selectedIndex,
      isCorrect,
      timeSpent,
    };
    set((state) => ({ quizResults: [...state.quizResults, result] }));
    return isCorrect;
  },

  nextQuiz: () => {
    const { currentQuizSet, currentQuizIndex } = get();
    if (!currentQuizSet) return false;
    set({ currentQuizIndex: currentQuizIndex + 1 });
    return true;
  },

  getQuizResults: () => get().quizResults,

  resetQuizSession: () => {
    set({ currentQuizIndex: 0, quizResults: [] });
  },
}));
