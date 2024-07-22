import styled from 'styled-components';
const Header = () => {
  return <HeaderLayout>PokeMon 도감</HeaderLayout>;
};

const HeaderLayout = styled.header`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  padding: 25px 0;
  text-align: center;
  color: #ffff00;
  background-color: #2e9afe;
`;

export default Header;
