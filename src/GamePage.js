import React, { useState, useEffect } from 'react';
import { header } from './assets/svgs';
import { o } from './assets/svgs';
import { x } from './assets/svgs';
import './App.css';

const X = 'X';
const O = 'O';
const initialBoxStates = Array(9).fill(null);
const initialGameState = { isOver: false, boxIndexes: null, stateOfBoxes: null };
const gameOverIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const gameOverStates = [O, X];

// checks whether the game is over or not
const gameOver = array => {
   let currentState = initialGameState;

   gameOverIndexes.forEach(indexSet => {
      gameOverStates.forEach(state => {
         if (array[indexSet[0]] === state && array[indexSet[1]] === state && array[indexSet[2]] === state) {
            currentState = { isOver: true, boxIndexes: indexSet, stateOfBoxes: state };
            return currentState;
         }
      });
   });

   return currentState;
};

export default function GamePage() {
   const [boxStates, setBoxStates] = useState(initialBoxStates); // state of the boxes
   const [gameState, setGameState] = useState(initialGameState); // state of the game
   const [turn, setTurn] = useState(X); // Sırası kimde (başlangıçta X)

   const switchState = (newBoxState, index) => {
      setBoxStates(currentboxStates => {
         const newboxStates = [...currentboxStates];
         newboxStates[index] = newBoxState;
         return newboxStates;
      });
   };

   function clickHandler(boxState, index) {
      // Eğer oyun bittiyse, oyunu resetle
      if (gameState.isOver) {
         setBoxStates(initialBoxStates);
         setGameState(initialGameState);
         setTurn(X);  // Oyunu yeniden başlatınca X başlar
      } else if (boxState === null) {
         // Eğer kutu boşsa, sıradaki oyuncunun simgesini yerleştir
         switchState(turn, index);
         // Sıra O'daysa X'e, X'deyse O'ya geç
         setTurn(turn === X ? O : X);
      }
   }

   const ticTacToe = boxStates.map((state, index) => {
      let className = state === X ? 'box box-x' : state === O ? 'box box-o' : 'box';
      if (gameState.isOver && gameState.boxIndexes.includes(index)) {
         className += gameState.stateOfBoxes === X ? ' complete-x' : gameState.stateOfBoxes === O ? ' complete-o' : '';
      }
      return (
         <div
            className={className}
            onClick={() => clickHandler(state, index)}
            key={index}
         >
            {state === X ? x : state === O ? o : null}
         </div>
      );
   });

   useEffect(() => {
      const newGameState = gameOver(boxStates);

      if (newGameState.isOver) {
         setGameState(newGameState);
      }
   }, [boxStates]);

   return (
      <div className='container'>
         <div className='header'>
            {header}
         </div>
         <div className='row'>
            {ticTacToe[0]}
            {ticTacToe[1]}
            {ticTacToe[2]}
         </div>
         <div className='row'>
            {ticTacToe[3]}
            {ticTacToe[4]}
            {ticTacToe[5]}
         </div>
         <div className='row'>
            {ticTacToe[6]}
            {ticTacToe[7]}
            {ticTacToe[8]}
         </div>
      </div>
   );
}
