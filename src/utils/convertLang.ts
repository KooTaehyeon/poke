interface LanguageData {
  language: {
    name: string;
  };
  name: string; // 다른 필요한 속성들 추가 가능
}

export const convertLanguage = (context: LanguageData[] | undefined) => {
  const lang = {
    lang: 'ko',
    langNum_genera: 7,
  };

  // context가 undefined가 아닌지 확인합니다.
  if (!context) {
    return [];
  }

  // 언어가 'ko'인 요소를 필터링합니다.
  const filteredData = context.filter(
    (data) => data.language.name === lang.lang
  );

  // 필터링된 데이터에서 name 속성을 추출하여 반환합니다.
  return filteredData.map((data) => data.name);
};
