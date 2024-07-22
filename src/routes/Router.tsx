import Main from '../containers/main/Main';
import Layout from '../components/Layout';
import Detail from '../containers/pokeDetail/Detail';
export const routes = [
  {
    path: '/',
    element: (
      <>
        <Layout />
      </>
    ),
    children: [
      { path: '/', element: <Main />, index: true },
      { path: '/pokemon/:id', element: <Detail /> },
      // { path: "/pokemon/type:type", element: <PokemonIndex /> },
      // { path: "/pokemon/type/:type", element: <PokemonType /> },
    ],
  },
];
