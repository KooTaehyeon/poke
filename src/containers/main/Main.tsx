import React from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPoketmonListAll } from '../../api/pokeApi';
import { useInView } from 'react-intersection-observer';
import PokeCard from '../../components/PokeCard';
import { Loding } from '../../components/Loding';
import Search from '../search/Search';
import useInput from '../../hook/useInput';

const Main = () => {
  const search = useInput('');

  const {
    data, // 데이터
    fetchNextPage, // 다음 데이터
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['pokeAll', search.value],
    queryFn: async ({ pageParam }) => {
      return await getPoketmonListAll({ pageParam, search: search.value });
    },
    getNextPageParam: (lastPage, pages) => {
      // const nextPage = pages.length * 12;
      // const { next }: any = lastPage;
      // console.log(lastPage, 'next', next);
      // if (!next) return undefined;
      // return Number(new URL(next).searchParams.get('offset'));
      // return lastPage && lastPage.length > 0 ? nextPage : undefined;
      if (!lastPage || lastPage.length === 0) return undefined;
      return pages.length * 12;
    },
    initialPageParam: 0, // initialPageParam을 명시적으로 지정
  });

  //  옵저버
  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage || isFetchingNextPage,
    onChange: (inView) => {
      if (search.value !== '') return;
      if (inView) fetchNextPage();
    },
  });
  const searchRefetch = () => {
    // 검색시 api 재호출
    refetch();
  };

  return (
    <>
      {/* 검색창 */}
      <Search search={search} refetch={searchRefetch} />
      {/* 로딩페이지 */}
      {isPending && <Loding />}
      <Dev>
        {/* 검색시  */}
        {search.value !== ''
          ? data?.pages.map((pokemon, idx) => {
              console.log(pokemon);
              const name = pokemon[0].name;
              return (
                <React.Fragment key={`${idx}`}>
                  <PokeCard name={name} />
                </React.Fragment>
              );
            })
          : data &&
            // 기본 초기 데이터
            data?.pages.map((page, pageIndex) =>
              page.map((pokemon: { name: string }, idx: any) => {
                return (
                  <React.Fragment key={`${pageIndex}-${idx}`}>
                    <PokeCard name={pokemon.name} />
                  </React.Fragment>
                );
              })
            )}
      </Dev>
      {/* 옵저버 */}
      <div ref={ref} style={{ padding: '10px 0' }} />
    </>
  );
};

const Dev = styled.div`
  margin-top: 30px;
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export default Main;
