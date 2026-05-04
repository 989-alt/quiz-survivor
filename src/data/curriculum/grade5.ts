// 5학년 교육과정
export const GRADE_5_CURRICULUM = {
  grade: 5,
  subjects: {
    math: {
      name: '수학',
      topics: [
        {
          id: 'decimals',
          name: '소수',
          description: '소수의 덧셈과 뺄셈',
          examples: ['3.5 + 2.7 = ?', '5.2 - 1.8 = ?'],
          range: { type: 'decimal', precision: 1 },
        },
        {
          id: 'fractions_diff_denom',
          name: '분모가 다른 분수',
          description: '통분과 분수의 덧셈/뺄셈',
          examples: ['1/2 + 1/3 = ?', '3/4 - 1/6 = ?'],
        },
        {
          id: 'decimal_comparison',
          name: '소수의 크기 비교',
          description: '소수의 크기 비교',
          examples: ['0.5와 0.35 중 더 큰 수는?'],
        },
        {
          id: 'percentage_intro',
          name: '백분율 기초',
          description: '백분율의 이해',
          examples: ['1/4는 몇 %?', '50%는 분수로?'],
        },
        {
          id: 'area_volume',
          name: '넓이와 부피',
          description: '직사각형 넓이, 직육면체 부피',
          examples: ['가로 5cm, 세로 3cm인 직사각형의 넓이는?'],
        },
      ],
    },
    korean: {
      name: '국어',
      topics: [
        {
          id: 'homophones',
          name: '동음이의어',
          description: '소리는 같지만 뜻이 다른 말',
          examples: ["'배'의 다양한 뜻은?"],
        },
        {
          id: 'writing_structure',
          name: '글의 구조',
          description: '서론, 본론, 결론',
          examples: ['이 문단은 글의 어느 부분?'],
        },
      ],
    },
  },
  aiPromptGuidelines: `
    5학년 학생을 위한 문제를 생성해주세요:
    - 소수 (소수점 첫째 자리) 연산
    - 분모가 다른 분수 (통분 필요)
    - 백분율 기초
    - 넓이와 부피 계산
    - 동음이의어, 다의어
  `,
};
