import ky from 'ky';

export const client = ky.create({
  credentials: 'same-origin',
  prefixUrl: 'https://pokeapi.co/api/v2/',
});

export interface Pokemon {
  name: string;
  url: string;
  next?: string;
}

export const getPoketmonListAll = async ({ pageParam = 0, search }: any) => {
  let apiUrl = 'pokemon';
  if (search) {
    apiUrl = `pokemon/${search}`;
  }
  const OFFSET = 12;
  // 포켓몬 12개 씩
  const response: any = await client
    .get(apiUrl, {
      searchParams: { limit: OFFSET, offset: pageParam },
    })
    .json();

  // 'results' 필드만 반환
  if (search !== '') return [response];
  return response.results;
};
// 기본정보
export const getPoketmonInfo = async (pokeIdx: string) => {
  return await client.get(`pokemon/${pokeIdx}`).json();
};
// 이름 가져오기 및 타입
export const getPokemonListWithSpecies = async (
  id: string | undefined | number
) => {
  return await client.get(`pokemon-species/${id}`).json();
};
