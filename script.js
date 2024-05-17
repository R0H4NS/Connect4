let currentPlayer = 'red';
let gameBoard = Array(6).fill(null).map(() => Array(7).fill(null));
const columns = Array.from(document.getElementsByClassName('column'));

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    updateCurrentPlayerDisplay();
});

function handleCellClick(e) {
    const cell = e.target;
    const colIndex = cell.dataset.col;
    const rowIndex = getAvailableRow(colIndex);

    if (rowIndex === -1) {
        alert('Column is full');
        return;
    }

    gameBoard[rowIndex][colIndex] = currentPlayer;
    updateCellColor(rowIndex, colIndex);
    if (checkWin(rowIndex, colIndex)) {
        alert(`${currentPlayer} wins!`);
        resetGame();
        return;
    }

    if (isBoardFull()) {
        alert('It\'s a tie!');
        resetGame();
        return;
    }

    currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
    updateCurrentPlayerDisplay();
}

function getAvailableRow(colIndex) {
    for (let row = gameBoard.length - 1; row >= 0; row--) {
        if (!gameBoard[row][colIndex]) {
            return row;
        }
    }
    return -1;
}

function updateCellColor(rowIndex, colIndex) {
    const cell = document.querySelector(`.cell[data-row='${rowIndex}'][data-col='${colIndex}']`);
    cell.style.backgroundColor = currentPlayer;
}

function checkWin(rowIndex, colIndex) {
    return checkDirection(rowIndex, colIndex, 1, 0) ||
        checkDirection(rowIndex, colIndex, 0, 1) ||
        checkDirection(rowIndex, colIndex, 1, 1) ||
        checkDirection(rowIndex, colIndex, 1, -1);
}

function checkDirection(rowIndex, colIndex, rowStep, colStep) {
    let count = 0;
    let row = rowIndex;
    let col = colIndex;
    while (row >= 0 && row < 6 && col >= 0 && col < 7 && gameBoard[row][col] === currentPlayer) {
        count++;
        row += rowStep;
        col += colStep;
    }
    row = rowIndex - rowStep;
    col = colIndex - colStep;
    while (row >= 0 && row < 6 && col >= 0 && col < 7 && gameBoard[row][col] === currentPlayer) {
        count++;
        row -= rowStep;
        col -= colStep;
    }
    return count >= 4;
}

function isBoardFull() {
    return gameBoard.every(row => row.every(cell => cell));
}

function resetGame() {
    gameBoard = Array(6).fill(null).map(() => Array(7).fill(null));
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
    currentPlayer = 'red';
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const playerDisplay = document.getElementById('current-player');
    playerDisplay.textContent = `Current Player: ${currentPlayer}`;
}
