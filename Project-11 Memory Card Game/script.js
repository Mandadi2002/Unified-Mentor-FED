const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const newGameBtn = document.getElementById('new-game');

let cardValues = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐵', '🦁'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let moves = 0;
let startTime = null;
let timerInterval = null;

// Shuffle and start a new game
function startGame() {
  board.innerHTML = '';
  cards = [...cardValues, ...cardValues];
  cards.sort(() => 0.5 - Math.random());

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  moves = 0;
  startTime = null;
  movesDisplay.textContent = `🔁 Moves: 0`;
  timerDisplay.textContent = `⏱️ Time: 0 sec`;
  clearInterval(timerInterval);

  cards.forEach(value => createCard(value));
}

// Timer
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    timerDisplay.textContent = `⏱️ Time: ${elapsed} sec`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Card creation
function createCard(value) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value;
  card.textContent = '';

  card.addEventListener('click', () => {
    if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;

    if (!startTime) startTimer();

    card.classList.add('flipped');
    card.textContent = value;

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      moves++;
      movesDisplay.textContent = `🔁 Moves: ${moves}`;
      checkMatch();
    }
  });

  board.appendChild(card);
}

// Match logic
function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    matchedPairs++;
    firstCard = null;
    secondCard = null;

    if (matchedPairs === cardValues.length) {
      stopTimer();
      setTimeout(() => {
        const totalTime = Math.floor((new Date() - startTime) / 1000);
        alert(`🎉 Congratulations! You completed the game in ${totalTime} seconds with ${moves} moves.`);
      }, 300);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

// New game button
newGameBtn.addEventListener('click', startGame);

// Start the first game
startGame();
