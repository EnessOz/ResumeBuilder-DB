import './App.css';
import { RouteComp } from './components/routeComp';

import { Header } from './pages/header';




function App() {
  return (
    <div className="app-container">
      <div className='app-inside'>
        <Header/>
        <RouteComp />
      </div>
    </div>
  );
}

export default App;
