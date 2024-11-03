const game = document.getElementById('game');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const gameModeSelect = document.getElementById('gameMode');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'friend';
// Winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// Handle cell clicks
function handleCellClick(index) {
if (board[index] !== '' || !gameActive || (gameMode === 'computer' && currentPlayer === 'O')) {
    return;
}
  board[index] = currentPlayer;
  renderBoard();
  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameMode === 'computer' && currentPlayer === 'O') {
      setTimeout(computerMove, 500);
    }
  }
}
// Computer's turn logic
function computerMove() {
// Try to win
for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === 'O' && board[b] === 'O' && board[c] === '') {
        board[c] = 'O';
        renderBoard();
        checkWinner();
        currentPlayer = 'X';
        return;
    }
    if (board[a] === 'O' && board[c] === 'O' && board[b] === '') {
        board[b] = 'O';
        renderBoard();
        checkWinner();
        currentPlayer = 'X';
        return;
    }
    if (board[b] === 'O' && board[c] === 'O' && board[a] === '') {
        board[a] = 'O';
        renderBoard();
        checkWinner();
        currentPlayer = 'X';
        return;
    }
}

    // Block opponent's win
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] === 'X' && board[b] === 'X' && board[c] === '') {
            board[c] = 'O';
            renderBoard();
            checkWinner();
            currentPlayer = 'X';
            return;
        }
        if (board[a] === 'X' && board[c] === 'X' && board[b] === '') {
            board[b] = 'O';
            renderBoard();
            checkWinner();
            currentPlayer = 'X';
            return;
        }
        if (board[b] === 'X' && board[c] === 'X' && board[a] === '') {
            board[a] = 'O';
            renderBoard();
            checkWinner();
            currentPlayer = 'X';
            return;
        }
    }

    // Choose center if available
    if (board[4] === '') {
        board[4] = 'O';
        renderBoard();
        checkWinner();
        currentPlayer = 'X';
        return;
    }

    // Choose a random empty cell as a fallback
    const emptyCells = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerCell = emptyCells[randomIndex];
        board[computerCell] = 'O';
        renderBoard();
        checkWinner();
        currentPlayer = 'X';
    }
}
// Render the game board
function renderBoard() {
  game.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    game.appendChild(cellElement);
  });
}

// Check for a winner or draw
function checkWinner() {
  let roundWon = false;
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === '' || board[b] === '' || board[c] === '') {
      continue;
    }
    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  if (!board.includes('')) {
    statusText.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
}
statusText.textContent = `It's ${currentPlayer}'s turn.`;
}
// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  gameMode = gameModeSelect.value;
  statusText.textContent = `It's ${currentPlayer}'s turn.`;
  renderBoard();
}
// Event listeners
resetButton.addEventListener('click', resetGame);
gameModeSelect.addEventListener('change', resetGame);
renderBoard();
