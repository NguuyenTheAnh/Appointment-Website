import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';


const App = () => {
  return (
    <div className="app-container">
      <div className='app-header'>
        <Header />
      </div>
      <div className='app-content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
