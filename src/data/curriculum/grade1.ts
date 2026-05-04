// 1학년 교육과정
export const GRADE_1_CURRICULUM = {
  grade: 1,
  subjects: {
    math: {
      name: '수학',
      topics: [
        {
          id: 'numbers_1_9',
          name: '9까지의 수',
          description: '1부터 9까지 수의 순서와 크기 비교',
          examples: ['3 다음에 오는 수는?', '5와 7 중 더 큰 수는?'],
        },
        {
          id: 'addition_basic',
          name: '한 자리 수 덧셈',
          description: '합이 9 이하인 덧셈',
          examples: ['2 + 3 = ?', '4 + 5 = ?'],
          range: { min: 1, max: 9, operations: ['+'] },
        },
        {
          id: 'subtraction_basic',
          name: '한 자리 수 뺄셈',
          description: '9 이하의 수에서 빼기',
          examples: ['7 - 2 = ?', '9 - 4 = ?'],
          range: { min: 1, max: 9, operations: ['-'] },
        },
        {
          id: 'comparison',
          name: '수의 크기 비교',
          description: '두 수의 크기 비교하기',
          examples: ['6 ○ 8 (>, <, =)', '5 ○ 5'],
        },
      ],
    },
    korean: {
      name: '국어',
      topics: [
        {
          id: 'hangul_basic',
          name: '한글 기초',
          description: '자음과 모음, 글자 만들기',
          examples: ['ㄱ + ㅏ = ?', '가나다라 다음은?'],
        },
        {
          id: 'words_basic',
          name: '낱말 익히기',
          description: '기초 낱말과 그림 연결',
          examples: ['사과의 첫 글자는?', '강아지는 몇 글자?'],
        },
      ],
    },
  },
  aiPromptGuidelines: `
    1학년 학생을 위한 문제를 생성해주세요:
    - 1-9 범위의 숫자만 사용
    - 덧셈, 뺄셈만 (곱셈/나눗셈 제외)
    - 결과가 음수가 되지 않도록
    - 쉬운 한글 단어 사용
    - 그림이나 이모지를 활용한 친근한 문제
  `,
};
