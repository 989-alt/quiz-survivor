// 4학년 교육과정
export const GRADE_4_CURRICULUM = {
  grade: 4,
  subjects: {
    math: {
      name: '수학',
      topics: [
        {
          id: 'large_numbers',
          name: '큰 수',
          description: '만, 억, 조 단위의 큰 수',
          examples: ['35000은 만 몇 개?', '1억은 만 몇 개?'],
        },
        {
          id: 'mixed_operations',
          name: '혼합 계산',
          description: '덧셈, 뺄셈, 곱셈, 나눗셈 혼합',
          examples: ['24 + 6 × 5 = ?', '(12 + 8) ÷ 4 = ?'],
          range: { min: 1, max: 100, operations: ['+', '-', '*', '/'] },
        },
        {
          id: 'fractions_same_denom',
          name: '분모가 같은 분수',
          description: '분모가 같은 분수의 덧셈과 뺄셈',
          examples: ['2/5 + 1/5 = ?', '4/7 - 2/7 = ?'],
        },
        {
          id: 'angles',
          name: '각도',
          description: '각의 크기 측정 (도)',
          examples: ['직각은 몇 도?', '삼각형 세 각의 합은?'],
        },
        {
          id: 'multiplication_2digit',
          name: '두 자리 수 곱셈',
          description: '(두 자리) × (한 자리)',
          examples: ['23 × 4 = ?', '56 × 7 = ?'],
          range: { min: 10, max: 99, multiplier: { min: 2, max: 9 } },
        },
      ],
    },
    korean: {
      name: '국어',
      topics: [
        {
          id: 'idioms',
          name: '관용 표현',
          description: '자주 쓰이는 관용 표현',
          examples: ["'발이 넓다'의 의미는?"],
        },
        {
          id: 'paragraph_structure',
          name: '문단의 구조',
          description: '중심 문장과 뒷받침 문장',
          examples: ['중심 문장을 찾으세요'],
        },
      ],
    },
  },
  aiPromptGuidelines: `
    4학년 학생을 위한 문제를 생성해주세요:
    - 혼합 계산 (괄호, 연산 순서)
    - 두 자리 × 한 자리 곱셈
    - 분모가 같은 분수 덧셈/뺄셈
    - 각도 개념 (직각, 예각, 둔각)
    - 관용 표현과 속담
  `,
};
