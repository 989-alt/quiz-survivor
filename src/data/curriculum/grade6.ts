// 6학년 교육과정
export const GRADE_6_CURRICULUM = {
  grade: 6,
  subjects: {
    math: {
      name: '수학',
      topics: [
        {
          id: 'ratio',
          name: '비와 비율',
          description: '비의 개념과 비율 계산',
          examples: ['3:5를 비율로 나타내면?', '20%는 비로?'],
        },
        {
          id: 'proportion',
          name: '비례식',
          description: '비례식과 비례배분',
          examples: ['3:4 = 6:□에서 □는?'],
        },
        {
          id: 'sequences',
          name: '수열과 규칙',
          description: '수열의 규칙 찾기',
          examples: ['2, 5, 8, 11, ... 다음 수는?'],
        },
        {
          id: 'statistics',
          name: '평균과 통계',
          description: '평균, 중앙값의 이해',
          examples: ['70, 80, 90의 평균은?'],
        },
        {
          id: 'geometry_advanced',
          name: '원과 입체도형',
          description: '원의 넓이, 원기둥/원뿔',
          examples: ['반지름이 3cm인 원의 넓이는?'],
        },
      ],
    },
    korean: {
      name: '국어',
      topics: [
        {
          id: 'grammar',
          name: '문법',
          description: '품사, 문장 성분',
          examples: ["'예쁜'은 무슨 품사?"],
        },
        {
          id: 'literary_devices',
          name: '표현 기법',
          description: '비유, 반복, 대조 등',
          examples: ['이 문장에 사용된 표현 기법은?'],
        },
      ],
    },
  },
  aiPromptGuidelines: `
    6학년 학생을 위한 문제를 생성해주세요:
    - 비와 비율, 비례식
    - 수열과 규칙 찾기
    - 평균과 기초 통계
    - 원의 둘레와 넓이 (π 사용)
    - 문법 (품사, 문장 성분)
    - 문학적 표현 기법
  `,
};
