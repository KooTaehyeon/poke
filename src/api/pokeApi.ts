import ky from 'ky';

export const client = ky.create({
  credentials: 'same-origin',
  prefixUrl: 'https://pokeapi.co/api/v2/',
});

// interface GetPoketmonListAllParams {
//   pageParam?: number;
//   search?: string;
// }
export interface Pokemon {
  name: string;
  url: string;
  next?: string;
}
// interface PokemonListResponse {
//   results: Pokemon[];
//   count: number;
//   next?: string;
//   previous?: string;
// }

// interface GetPoketmonListAllParams {
//   pageParam?: number;
//   search?: string;
// }
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
// 포켓몬 능력
export const getPokemonAbiluty = async (id: string | undefined) => {
  return await ky.get(`ability/${id}`).json();
};

export const getPoketmonInfoUrl = async (url: string) => {
  return await ky.get(url, { credentials: 'same-origin' }).json();
};
// 기본정보url
// 여러 URL을 받아서 결과를 배열로 반환하는 함수
export const getPoketmonInfoUrls = async (urls: string[]) => {
  if (!urls || urls.length === 0) {
    return []; // URL이 없는 경우 빈 배열 반환
  }
  const results = await Promise.all(urls.map((url) => getPoketmonInfoUrl(url)));
  return results;
};

export const getPokemonType = async (typeId: string | undefined) => {
  return await client.get(`/type/${typeId}`).json();
};
