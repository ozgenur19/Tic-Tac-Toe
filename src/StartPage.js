import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

export default function StartPage() {
  const navigate = useNavigate(); // Yönlendirme için kullanılır

  const handleStartGame = () => {
    navigate('/game'); // Oyun sayfasına yönlendirme
  };

  return (
    <div className="container">
      <div>
        <h1>Welcome to Tic-Tac-Toe Game</h1>
        <p>Press the button below to start playing</p>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  );
}
