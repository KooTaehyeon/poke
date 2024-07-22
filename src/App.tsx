import { useRoutes } from 'react-router-dom';
import { routes } from '../src/routes/Router';
function App() {
  const elem = useRoutes(routes);
  return <div className='App'>{elem}</div>;
}

export default App;
