document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('game-status');
    const restartBtn = document.getElementById('restart-btn');
    let currentPlayer = 'red';
    let board = Array(6).fill(null).map(() => Array(7).fill(null));
    let gameActive = true;


    const updateStatus = () => {
        if (!gameActive) return;
        statusDisplay.textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s Turn (${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)})`;
    };


    const checkWin = () => {
        const directions = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: -1 }
        ];


        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 7; x++) {
                const player = board[y][x];
                if (player === null) continue;


                for (let { x: dx, y: dy } of directions) {
                    let count = 1;


                    for (let i = 1; i < 4; i++) {
                        const nx = x + dx * i;
                        const ny = y + dy * i;


                        if (nx >= 0 && nx < 7 && ny >= 0 && ny < 6 && board[ny][nx] === player) {
                            count++;
                        } else {
                            break;
                        }
                    }


                    if (count === 4) {
                        return true;
                    }
                }
            }
        }


        return false;
    };


    const checkTie = () => {
        return board.every(row => row.every(cell => cell !== null));
    };


    const handleClick = (e) => {
        if (!gameActive) return;


        const col = +e.target.dataset.col;
        for (let row = 5; row >= 0; row--) {
            if (board[row][col] === null) {
                board[row][col] = currentPlayer;
                cells[row * 7 + col].classList.add(currentPlayer);
                if (checkWin()) {
                    gameActive = false;
                    statusDisplay.textContent = `Player ${currentPlayer === 'red' ? 1 : 2} (${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}) Wins!`;
                } else if (checkTie()) {
                    gameActive = false;
                    statusDisplay.textContent = 'It\'s a Tie!';
                } else {
                    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                    updateStatus();
                }
                return;
            }
        }
    };


    const restartGame = () => {
        board = Array(6).fill(null).map(() => Array(7).fill(null));
        cells.forEach(cell => {
            cell.classList.remove('red', 'yellow');
        });
        currentPlayer = 'red';
        gameActive = true;
        updateStatus();
    };


    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartBtn.addEventListener('click', restartGame);
    updateStatus();
});

