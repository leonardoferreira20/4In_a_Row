import React, { useEffect, useState } from "react";
import Hole from "../hole/Hole";
import confetti from "canvas-confetti";
import FinishGame from "../finish-game/FinishGame";

const Grid = (props) => {
  const { currentPlayer, updateCurrentPlayer, isGameStarted, mousePosition, finishGame, selectedHole, clearGrid } =
    props;

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
  const playerComputerId = "3";

  const handleCheckWinRow = (gridCheckRow) => {
    let output = false;

    for (let i = 0; i < gridCheckRow.length; i++) {
      const color = gridCheckRow[i].backgroundColor;
      const row = gridCheckRow[i].row;
      if (
        color &&
        row &&
        gridCheckRow[i + 1]?.backgroundColor == color &&
        gridCheckRow[i + 1].row == row &&
        gridCheckRow[i + 2]?.backgroundColor == color &&
        gridCheckRow[i + 2].row == row &&
        gridCheckRow[i + 3]?.backgroundColor == color &&
        gridCheckRow[i + 3]?.row == row
      ) {
        output = true;
      }
    }

    return output;
  };

  const handleCheckWinCol = (gridCheckCol) => {
    let output = false;

    for (let i = 0; i < gridCheckCol.length; i++) {
      const color = gridCheckCol[i].backgroundColor;
      const col = gridCheckCol[i].col;

      if (
        color &&
        col &&
        gridCheckCol[i + 7]?.backgroundColor == color &&
        gridCheckCol[i + 7].col == col &&
        gridCheckCol[i + 14]?.backgroundColor == color &&
        gridCheckCol[i + 14].col == col &&
        gridCheckCol[i + 21]?.backgroundColor == color &&
        gridCheckCol[i + 21].col == col
      ) {
        output = true;
      }
    }

    return output;
  };

  const handleCheckWinMainDiag = (gridCheckMainDiag) => {
    let output = false;

    for (let i = 0; i < gridCheckMainDiag.length; i++) {
      const color = gridCheckMainDiag[i].backgroundColor;
      const row = gridCheckMainDiag[i].row;
      const col = gridCheckMainDiag[i].col;

      if (
        color &&
        row &&
        col &&
        gridCheckMainDiag[i + 8]?.backgroundColor == color &&
        gridCheckMainDiag[i + 8]?.row == row + 1 &&
        gridCheckMainDiag[i + 8]?.col == col + 1 &&
        gridCheckMainDiag[i + 16]?.backgroundColor == color &&
        gridCheckMainDiag[i + 16]?.row == row + 2 &&
        gridCheckMainDiag[i + 16]?.col == col + 2 &&
        gridCheckMainDiag[i + 24]?.backgroundColor == color &&
        gridCheckMainDiag[i + 24]?.row == row + 3 &&
        gridCheckMainDiag[i + 24]?.col == col + 3
      ) {
        output = true;
      }
    }

    return output;
  };
  const handleCheckWinSecDiag = (gridCheckWinSecDiag) => {
    let output = false;

    for (let i = 0; i < gridCheckWinSecDiag.length; i++) {
      const color = gridCheckWinSecDiag[i].backgroundColor;
      const row = gridCheckWinSecDiag[i].row;
      const col = gridCheckWinSecDiag[i].col;

      if (
        color &&
        row &&
        col &&
        gridCheckWinSecDiag[i + 6]?.backgroundColor == color &&
        gridCheckWinSecDiag[i + 6]?.row === row + 1 &&
        gridCheckWinSecDiag[i + 6]?.col === col - 1 &&
        gridCheckWinSecDiag[i + 12]?.backgroundColor == color &&
        gridCheckWinSecDiag[i + 12]?.row === row + 2 &&
        gridCheckWinSecDiag[i + 12]?.col === col - 2 &&
        gridCheckWinSecDiag[i + 18]?.backgroundColor == color &&
        gridCheckWinSecDiag[i + 18]?.row === row + 3 &&
        gridCheckWinSecDiag[i + 18]?.col === col - 3
      ) {
        output = true;
      }
    }

    return output;
  };

  const handleStartConfettis = () => {
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

  const handleClearGrid = () => {
    setGrid((prevGrid) =>
      prevGrid.map((cell) => ({
        ...cell,
        isSelected: false,
        backgroundColor: null,
      }))
    );
  };

  const handleWinner = () => {
    currentPlayer.points += 1;
    finishGame();
    handleStartConfettis();
  };

  const animateDrop = (columnCells, finalCell, onComplete) => {
    let i = 0;

    const animateStep = () => {
      if (i < columnCells.length) {
        const cell = columnCells[i];

        if (cell.row < finalCell.row) {
          // Marcar célula com cor temporária
          setGrid((prev) =>
            prev.map((c) =>
              c.row === cell.row && c.col === cell.col
                ? { ...c, isSelected: true, backgroundColor: currentPlayer.tokenColor }
                : c
            )
          );

          setTimeout(() => {
            setGrid((prev) =>
              prev.map((c) =>
                c.row === cell.row && c.col === cell.col ? { ...c, isSelected: false, backgroundColor: null } : c
              )
            );
            i++;
            animateStep();
          }, 90);
        } else {
          i++;
          animateStep(); // saltar células acima da final
        }
      } else {
        onComplete();
      }
    };

    animateStep();
  };

  const handleUpdateGrid = (hole) => {
    const columnCells = grid.filter((cell) => cell.col === hole.col).sort((a, b) => b.row - a.row);
    const targetCell = columnCells.find((cell) => !cell.isSelected);

    if (targetCell && isGameStarted) {
      const updatedGrid = grid.map((cell) => {
        if (cell.row === targetCell.row && cell.col === targetCell.col) {
          return {
            ...cell,
            isSelected: true,
            backgroundColor: currentPlayer?.tokenColor,
          };
        }
        return cell;
      });

      animateDrop([...columnCells].reverse(), targetCell, () => {
        // Só é executado depois da animação com setTimeouts
        selectedHole(targetCell);

        setGrid((prev) =>
          prev.map((c) =>
            c.row === targetCell.row && c.col === targetCell.col
              ? { ...c, isSelected: true, backgroundColor: currentPlayer.tokenColor }
              : c
          )
        );

        const isWin =
          handleCheckWinRow(updatedGrid) ||
          handleCheckWinCol(updatedGrid) ||
          handleCheckWinMainDiag(updatedGrid) ||
          handleCheckWinSecDiag(updatedGrid);

        if (isWin) {
          handleWinner();
        } else {
          if (!targetCell.isSpecialHole) {
            updateCurrentPlayer(currentPlayer);
          } else if (currentPlayer?.id == playerComputerId) {
            setTimeout(() => {
              handleComputerMove();
            }, 1000);
          }
        }
      });
    }
  };

  // Computer random movements
  const handleComputerMove = () => {
    const availableColumns = [];

    grid.forEach((cell) => {
      if (!cell.isSelected && !availableColumns.includes(cell.col)) {
        availableColumns.push(cell.col);
      }
    });

    if (availableColumns.length > 0) {
      const randomCol = availableColumns[Math.floor(Math.random() * availableColumns.length)];
      handleUpdateGrid({ col: randomCol });
    }
  };

  useEffect(() => {
    clearGrid(handleClearGrid);
  }, []);

  useEffect(() => {
    if (currentPlayer?.id === playerComputerId && isGameStarted) {
      const timeoutId = setTimeout(() => {
        handleComputerMove();
      }, 1500);

      return clearTimeout(timeoutId);
    }
  }, [currentPlayer, isGameStarted]);

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
      <div style={{ visibility: isGameStarted && currentPlayer?.id !== playerComputerId ? "visible" : "hidden" }}>
        <Hole
          positionTop="-80"
          positionLeft={mousePosition - 30}
          backgroundColor={currentPlayer?.tokenColor}
          isSelected={true}
          isSpecialHole={false}
          currentPlayer={null}
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
          updateGrid={handleUpdateGrid}
          isGameStarted={isGameStarted}
          isSpecialHole={cell.isSpecialHole}
          currentPlayer={currentPlayer}
        />
      ))}
    </div>
  );
};

export default Grid;
