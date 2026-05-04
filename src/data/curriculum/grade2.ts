// 2학년 교육과정
export const GRADE_2_CURRICULUM = {
  grade: 2,
  subjects: {
    math: {
      name: '수학',
      topics: [
        {
          id: 'numbers_100',
          name: '100까지의 수',
          description: '두 자리 수의 이해와 크기 비교',
          examples: ['56 다음 수는?', '78과 87 중 더 큰 수는?'],
        },
        {
          id: 'addition_2digit',
          name: '두 자리 수 덧셈',
          description: '받아올림이 있는/없는 덧셈',
          examples: ['23 + 45 = ?', '38 + 24 = ?'],
          range: { min: 10, max: 99, operations: ['+'] },
        },
        {
          id: 'subtraction_2digit',
          name: '두 자리 수 뺄셈',
          description: '받아내림이 있는/없는 뺄셈',
          examples: ['67 - 23 = ?', '52 - 18 = ?'],
          range: { min: 10, max: 99, operations: ['-'] },
        },
        {
          id: 'multiplication_intro',
          name: '곱셈 기초',
          description: '2, 5단 곱셈구구',
          examples: ['2 × 3 = ?', '5 × 4 = ?'],
          range: { min: 2, max: 9, operations: ['*'], tables: [2, 5] },
        },
        {
          id: 'time_basic',
          name: '시계 읽기',
          description: '정각과 30분 단위 시간',
          examples: ['3시 30분은 몇 분 후에 4시?'],
        },
      ],
    },
    korean: {
      name: '국어',
      topics: [
        {
          id: 'sentences',
          name: '문장 만들기',
          description: '주어, 서술어로 문장 완성',
          examples: ['( )가 달린다. 빈칸에 알맞은 말은?'],
        },
        {
          id: 'spelling_basic',
          name: '받침 있는 글자',
          description: '받침의 소리와 표기',
          examples: ["'닭'의 받침 소리는?"],
        },
      ],
    },
  },
  aiPromptGuidelines: `
    2학년 학생을 위한 문제를 생성해주세요:
    - 두 자리 수 (10-99) 덧셈/뺄셈
    - 2단, 5단 곱셈구구
    - 받아올림/받아내림 포함 가능
    - 시계 읽기 (정각, 30분)
    - 간단한 문장 구조
  `,
};
