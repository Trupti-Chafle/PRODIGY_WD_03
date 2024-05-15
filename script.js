let board = document.getElementById('board');
let currentPlayer = 'X';
let cells = Array.from({ length: 9 }, (_, index) => index);

function handleClick(index) {
    if (cells[index] === 'X' || cells[index] === 'O') return;
    cells[index] = currentPlayer;
    render();
    if (checkWinner(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        resetGame();
        return;
    }
    if (cells.every(cell => cell === 'X' || cell === 'O')) {
        alert('It\'s a tie!');
        resetGame();
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo =>
        combo.every(cell => cells[cell] === player)
    );
}

function render() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleClick(index));
        board.appendChild(cellElement);
    });
}

function resetGame() {
    cells = Array.from({ length: 9 }, (_, index) => index);
    currentPlayer = 'X';
    render();
}

render();
