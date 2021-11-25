import { useState } from "react";
import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';


export function TicTacToe() {
  return (
    // <div className="box">
    //   <p>Tic Tac Toe</p>
    // </div>
    <Game />
  );
}
function Game() {
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const { width, height } = useWindowSize();
const decideWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] !== null &&
        board[a] === board[b] &&
        board[b] === board[c]) {
        console.log("winner", board[a]);
        return board[a]; //  the winner is board[a] (i.e)X OR O
      }
    }
    return null; // if no winner
    // return ("draw"); 
  };


  const winner =decideWinner(board);
//   console.log(winner);
  const [isXTurn, setIsXTurn] = useState(true);

  const handleClick = (index) => {
    console.log(index);
    //creating board copy
    //to avoid toggling x & o get untouched and allow changes
    //  means that null means untouched
    //if no winner && if its untouched then update
    if (!winner && !board[index]) {
      // if(board[index]===null){
      const boardCopy = [...board];
      boardCopy[index] = isXTurn ? "x" : "o";
      setBoard(boardCopy);
      //changing turn
      setIsXTurn(!isXTurn);
    }
  };
  const restart = () => {
    setBoard([null, null, null, null, null, null, null, null, null,]);
    setIsXTurn(true);
  };

  return (
    <div className="full-game">
      <div className="board">
        {board.map((val, index) => (
          <GameBox val={val} onPlayerClick={() => handleClick(index)} />
        ))}
      </div>
      {/* if({winner}=="draw") { <h1>Match Draw</h1> }
      else{ */}
      {winner ? <h1>The Winner is : {winner}</h1> : ""}
      {winner ? <Confetti width={width} height={height} /> : ""}
      {/* <h1>Match Draw</h1> */}
{/* } */}
      <Button
      onClick={restart}
      variant="contained"><CachedIcon/>Restart</Button>
    </div>
  );
}
function GameBox({ val, onPlayerClick }) {
  // const [value,setValue]=useState(val);
  const styles = { color: val === "x" ? "green" : "red" };
  return (
    <div
      style={styles}
      // onClick={()=>{setValue(value==='x'?"o":"x")}}
      onClick={onPlayerClick}
      className="game-box">
      {val}
    </div>
  );
}

