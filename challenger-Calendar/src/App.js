import React from 'react';
import Calendario from './components/Calendar/Calendar'
import HeaderCalendario from './components/template/Header/Header'
import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderCalendario/>
      <Calendario/>
    </div>
  );
}

export default App
