import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getPokemonListWithSpecies, getPoketmonInfo } from '../../api/pokeApi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { convertLanguage } from '../../utils/convertLang';
import { entriesConvertLang } from '../../utils/entriesConvertLang';
import { ConvertedText } from '../../utils/convertType';
import { LanguageData } from '../../type';

const Detail = () => {
  const { id } = useParams();

  const { data: info }: any = useQuery({
    queryKey: ['pokeinfo', id],
    queryFn: () => getPoketmonInfo(id as string),
    retry: 1,
  });

  const { data: speciesInfo }: any = useQuery({
    queryKey: ['pokemonSpecies', info && info.species.name],
    queryFn: () => getPokemonListWithSpecies(info && info.species.name),
  });

  //이름
  const nameText: string[] = convertLanguage(speciesInfo && speciesInfo?.names);
  // 포켓몬 항목
  const entriesText: LanguageData[] = entriesConvertLang(
    speciesInfo && speciesInfo?.flavor_text_entries
  );
  //
  const generaText: LanguageData[] = entriesConvertLang(
    speciesInfo && speciesInfo?.genera
  );

  return (
    <Dev>
      {/* {speciesInfo && speciesInfo?.evolution_chain?.url} */}
      <div className='imgBox'>
        <LazyLoadImage
          src={
            info?.sprites?.versions?.['generation-v']?.['black-white']?.animated
              ?.front_default || info?.sprites?.front_default
          }
          alt={`사진`}
          effect='blur'
          wrapperProps={{
            style: { transitionDelay: '2s' },
          }}
        />
        <Neme>{speciesInfo && nameText[0]}</Neme>
        <AnimalName>{speciesInfo && generaText[0]?.genus}</AnimalName>
        <TagBox>
          {info &&
            info.types.map((item: { type: { name: string | number } }) => {
              return (
                <Tag color={ConvertedText[item.type.name].color}>
                  {ConvertedText[item.type.name].name}타입
                </Tag>
              );
            })}
        </TagBox>
        <Description>{speciesInfo && entriesText[0].flavor_text}</Description>
      </div>
    </Dev>
  );
};
const Dev = styled.div`
  width: 100vw;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;

  .imgBox {
    margin-top: 20px;
    text-align: center;
    width: 400px;
    height: 500px;
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    img {
      margin: 0 auto;
      height: 100px; /* 이미지 크기 조정 */
      max-width: 100%; /* 이미지가 상자를 넘지 않도록 */
      /* border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
    }
  }
`;
const TagBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Tag = styled.span`
  background-color: ${(props) => props.color};
  padding: 7px;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 700;
  margin: 0px 5px;
`;
const Neme = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin: 10px 0 0 0;
`;
const AnimalName = styled.p`
  font-size: 20px;
  font-weight: 600;
`;
const Description = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

export default Detail;
