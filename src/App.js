import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';  
import GamePage from './GamePage';   

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />  {/* Başlangıç sayfası */}
        <Route path="/game" element={<GamePage />} />  {/* Oyun sayfası */}
      </Routes>
    </Router>
  );
}

export default App;
