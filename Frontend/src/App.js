import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from '../src/layout/Header'
import Footer from '../src/layout/Footer'

const App = () => {
  return (
    <div className="app-container">
      <div className='app-header'>
        <Header />
      </div>
      <div className='app-content'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
