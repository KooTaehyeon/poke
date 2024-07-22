import { useQuery } from '@tanstack/react-query';
import {
  getPoketmonInfo,
  getPokemonListWithSpecies,
  // getPokemonAbiluty,
} from '../api/pokeApi';
import styled from 'styled-components';
import { convertLanguage } from '../utils/convertLang';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
const PokeCard = ({ name }: { name: string }) => {
  // console.log(name, 'name', url);
  const navigate = useNavigate();
  const { data }: any = useQuery({
    queryKey: ['pokeinfo', name],
    queryFn: () => getPoketmonInfo(name),
    retry: 1,
  });

  const { data: pokemonSpecies }: any = useQuery({
    queryKey: ['pokemonSpecies', data && data.species.name],
    queryFn: () => getPokemonListWithSpecies(data && data.species.name),
  });

  // console.log(pokemonSpecies);
  // const { data: abiluty }: any = useQuery({
  //   queryKey: ['getPokemonAbiluty', data && data.id],
  //   queryFn: () => getPokemonAbiluty('hustle'),
  // });
  // console.log(abiluty, 'abiluty');

  const nameText: string[] = convertLanguage(pokemonSpecies?.names);

  // let generaText: any = convertLanguage(pokemonSpecies?.genera);
  const imageErrorHandler = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget as HTMLImageElement;
    console.log(target, target.src, 'src');

    target.src = '/images/packmonBall.jpeg';
  };
  if (data === '') return <></>;

  return (
    <Card onClick={() => navigate(`/pokemon/${data.id}`)}>
      <LazyLoadImage
        src={
          data?.sprites?.versions?.['generation-v']?.['black-white']?.animated
            ?.front_default || data?.sprites?.front_default
        }
        alt={`${nameText[0]}사진`}
        effect='blur'
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          imageErrorHandler(e)
        }
        wrapperProps={{
          style: { transitionDelay: '2s' },
        }}
      />
      <p>
        No {data && data?.id}. {nameText[0]}
        {/* <br />({(generaText && generaText[0].genus) || ''}) */}
      </p>
      <TypeTag>
        {data &&
          data.types.map((item: { slot: number; type: { name: string } }) => {
            return (
              <img
                key={item.slot}
                src={`/images/TYPE/${item.type.name}.svg`}
                alt={`${pokemonSpecies && pokemonSpecies.names[2]?.name}타입`}
              />
            );
          })}
      </TypeTag>
    </Card>
  );
};
const Card = styled.div`
  padding: 30px;
  border: 1px solid #dcdcdc;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 10px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  img {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
`;
const TypeTag = styled.div`
  img {
    margin: 0 5px;
    width: 30px;
    height: 30px;
  }
`;

export default PokeCard;
