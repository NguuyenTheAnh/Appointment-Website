import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import HomePage from './components/Home/HomePage';
import Contact from './components/Contact';
import Booking from './components/Booking/Booking';
import Appointment from './components/Appointment/Appointment';
import TeacherInfo from './components/TeacherInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='booking' element={<Booking />} />
          <Route path='contact' element={<Contact />} />
          <Route path='appointment' element={<Appointment />} />
          <Route path='teacherInfo/:teacherId' element={<TeacherInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
