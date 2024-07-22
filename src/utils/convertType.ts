interface pokeType {
  [key: string]: {
    name: string;
    color: string;
  };
}

export const ConvertedText: pokeType = {
  normal: { name: '노말', color: '#9FA19F' },
  fighting: { name: '격투', color: '#FF8000' },
  flying: { name: '비행', color: '#81B9EF' },
  ground: { name: '땅', color: '#915121' },
  // shadow: { name: '다크', color: '#624D4E' },
  rock: { name: '바위', color: '#AFA981' },
  bug: { name: '벌레', color: '#91A119' },
  ghost: { name: '고스트', color: '#704170' },
  fairy: { name: '페어리', color: '#EF70EF' },
  unknown: { name: '???', color: '#68A090' },
  poison: { name: '독', color: '#9141CB' },
  steel: { name: '강철', color: '#60A1B8' },
  fire: { name: '불꽃', color: '#E62829' },
  water: { name: '물', color: '#2980EF' },
  grass: { name: '풀', color: '#3FA129' },
  electric: { name: '전기', color: '#FAC000' },
  psychic: { name: '에스퍼', color: '#EF4179' },
  ice: { name: '얼음', color: '#3DCEF3' },
  dragon: { name: '드래곤', color: '#5060E1' },
  dark: { name: '악', color: '#624D4E' },
};
