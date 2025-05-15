import React, { useEffect, useState } from "react";
import Hole from "../hole/Hole";
import confetti from "canvas-confetti";
import FinishGame from "../finish-game/FinishGame";

const Grid = (props) => {
  const { currentPlayer, updateCurrentPlayer, isGameStarted, mousePosition, finishGame } = props;

  const createGrid = () => {
    const rows = 6;
    const columns = 7;
    const grid = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        grid.push({
          positionTop: 20 + row * 75,
          positionLeft: 20 + col * 75,
          isSelected: false,
          backgroundColor: null,
          row: row + 1,
          col: col + 1,
          isSpecialHole: false,
        });
      }
    }

    return grid;
  };

  const [grid, setGrid] = useState(() => createGrid());

  const checkWinRow = (gridCheckRow) => {
    let output = false;

    for (let i = 0; i < gridCheckRow.length; i++) {
      const color = gridCheckRow[i].backgroundColor;
      if (
        color &&
        color == gridCheckRow[i + 1]?.backgroundColor &&
        color == gridCheckRow[i + 2]?.backgroundColor &&
        color == gridCheckRow[i + 3]?.backgroundColor
      ) {
        output = true;
      }
    }

    return output;
  };

  const checkWinCol = (gridCheckCol) => {
    let output = false;

    for (let i = 0; i < gridCheckCol.length; i++) {
      const color = gridCheckCol[i].backgroundColor;

      if (
        color &&
        color == gridCheckCol[i + 7]?.backgroundColor &&
        color == gridCheckCol[i + 14]?.backgroundColor &&
        color == gridCheckCol[i + 21]?.backgroundColor
      ) {
        output = true;
      }
    }

    return output;
  };

  const checkWinMainDiag = (gridCheckMainDiag) => {
    let output = false;

    for (let i = 0; i < gridCheckMainDiag.length; i++) {
      const color = gridCheckMainDiag[i].backgroundColor;

      if (
        color &&
        gridCheckMainDiag[i + 8]?.backgroundColor === color &&
        gridCheckMainDiag[i + 16]?.backgroundColor === color &&
        gridCheckMainDiag[i + 24]?.backgroundColor === color
      ) {
        output = true;
      }
    }

    return output;
  };
  const checkWinSecDiag = (gridCheckWinSecDiag) => {
    let output = false;

    for (let i = 0; i < gridCheckWinSecDiag.length; i++) {
      const color = gridCheckWinSecDiag[i].backgroundColor;

      if (
        color &&
        gridCheckWinSecDiag[i + 6]?.backgroundColor === color &&
        gridCheckWinSecDiag[i + 12]?.backgroundColor === color &&
        gridCheckWinSecDiag[i + 18]?.backgroundColor === color
      ) {
        output = true;
      }
    }

    return output;
  };

  const startConfettis = () => {
    var duration = 5 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const clearGrid = () => {
    setGrid((prevGrid) =>
      prevGrid.map((cell) => ({
        ...cell,
        isSelected: false,
        backgroundColor: null,
      }))
    );
  };

  const winner = () => {
    //clearGrid();
    currentPlayer.points += 1;
    finishGame();
    startConfettis();
  };

  const handlerUpdateGrid = (event, hole) => {
    const columnCells = grid.filter((cell) => cell.col === hole.col).sort((a, b) => b.row - a.row);
    const targetCell = columnCells.find((cell) => !cell.isSelected);

    if (targetCell && isGameStarted) {
      const updatedGrid = grid.map((cell) => {
        if (cell.row === targetCell.row && cell.col === targetCell.col) {
          cell.isSelected = true;
          cell.backgroundColor = currentPlayer?.tokenColor;
        }

        return cell;
      });

      setGrid(updatedGrid);

      if (
        checkWinRow(updatedGrid) ||
        checkWinCol(updatedGrid) ||
        checkWinMainDiag(updatedGrid) ||
        checkWinSecDiag(updatedGrid)
      ) {
        winner();
      } else {
        if (!targetCell.isSpecialHole) {
          updateCurrentPlayer(currentPlayer);
        }
      }
    }
  };

  useEffect(() => {
    const specialIndices = [];

    if (isGameStarted) {
      while (specialIndices.length < 5) {
        const randomIndex = Math.floor(Math.random() * grid.length);
        if (!specialIndices.includes(randomIndex)) {
          specialIndices.push(randomIndex);
        }
      }

      const updatedGrid = grid.map((cell, index) => ({
        ...cell,
        isSpecialHole: specialIndices.includes(index),
      }));

      setGrid(updatedGrid);
    }
  }, [isGameStarted]);

  return (
    <div>
      <div style={{ visibility: isGameStarted ? "visible" : "hidden" }}>
        <Hole
          positionTop="-80"
          positionLeft={mousePosition - 30}
          backgroundColor={currentPlayer?.tokenColor}
          isSelected={true}
          isSpecialHole={false}
        />
      </div>
      {grid.map((cell, index) => (
        <Hole
          key={index}
          holeSettings={cell}
          positionTop={cell.positionTop}
          positionLeft={cell.positionLeft}
          isSelected={cell.isSelected}
          backgroundColor={cell.backgroundColor}
          updateGrid={handlerUpdateGrid}
          isGameStarted={isGameStarted}
          isSpecialHole={cell.isSpecialHole}
        />
      ))}
    </div>
  );
};

export default Grid;
