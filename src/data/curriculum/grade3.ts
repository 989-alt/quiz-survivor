// 3학년 교육과정
export const GRADE_3_CURRICULUM = {
  grade: 3,
  subjects: {
    math: {
      name: '수학',
      topics: [
        {
          id: 'multiplication_full',
          name: '곱셈구구 완성',
          description: '2~9단 전체 곱셈구구',
          examples: ['7 × 8 = ?', '6 × 9 = ?'],
          range: { min: 2, max: 9, operations: ['*'] },
        },
        {
          id: 'division_basic',
          name: '나눗셈 기초',
          description: '곱셈과 나눗셈의 관계',
          examples: ['24 ÷ 6 = ?', '45 ÷ 9 = ?'],
          range: { min: 2, max: 81, operations: ['/'] },
        },
        {
          id: 'addition_3digit',
          name: '세 자리 수 덧셈',
          description: '세 자리 수끼리의 덧셈',
          examples: ['234 + 567 = ?', '456 + 289 = ?'],
          range: { min: 100, max: 999, operations: ['+'] },
        },
        {
          id: 'subtraction_3digit',
          name: '세 자리 수 뺄셈',
          description: '세 자리 수끼리의 뺄셈',
          examples: ['876 - 234 = ?', '503 - 278 = ?'],
          range: { min: 100, max: 999, operations: ['-'] },
        },
        {
          id: 'fractions_intro',
          name: '분수의 기초',
          description: '단위분수와 분수의 크기',
          examples: ['1/2과 1/4 중 더 큰 것은?'],
        },
      ],
    },
    korean: {
      name: '국어',
      topics: [
        {
          id: 'spelling_rules',
          name: '맞춤법',
          description: '소리와 표기가 다른 낱말',
          examples: ["'같이'의 올바른 발음은?"],
        },
        {
          id: 'reading_comprehension',
          name: '글 읽고 이해하기',
          description: '짧은 글의 중심 내용 파악',
          examples: ['이 글의 중심 생각은?'],
        },
      ],
    },
  },
  aiPromptGuidelines: `
    3학년 학생을 위한 문제를 생성해주세요:
    - 2~9단 곱셈구구 전체
    - 나눗셈 (나머지 없는)
    - 세 자리 수 (100-999) 덧셈/뺄셈
    - 기초 분수 개념 (1/2, 1/3, 1/4)
    - 맞춤법 규칙
  `,
};
