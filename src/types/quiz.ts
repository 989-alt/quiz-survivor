export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
}

export interface QuizSet {
  id: string;
  title: string;
  description?: string;
  quizzes: Quiz[];
  createdAt: number;
  sourceFileName?: string;
}

export interface QuizResult {
  quizId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpent: number;
}
