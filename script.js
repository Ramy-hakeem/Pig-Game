'use strict';
// Selecting players data
function getPlayerElement(player) {
  return document.querySelector(`.player--${player}`);
}
function getCurrentScoreElement(player) {
  return document.querySelector(`#current--${player}`);
}
function getScoreElement(player) {
  return document.querySelector(`#score--${player}`);
}
let activePlayer = 0;
let currentScore = 0;
let score = [0, 0];

// dice
const diceEl = document.querySelector('.dice');

// buttons
const roleBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

// game data and itial data
restGame();

// handle the btns
roleBtn.addEventListener('click', handleRole);
holdBtn.addEventListener('click', handleHold);
newGameBtn.addEventListener('click', restGame);

// handle the role logic
function handleRole() {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${randomNumber}.png`;
  diceEl.classList.remove('hidden');

  if (randomNumber !== 1) {
    currentScore += randomNumber;
    updateCurrentPlayerScore(currentScore);
  } else {
    updateCurrentPlayerScore(0);
    switchPlayer();
  }
}

function handleHold() {
  diceEl.classList.add('hidden');
  score[activePlayer] += currentScore;
  getScoreElement(activePlayer).textContent = score[activePlayer];
  updateCurrentPlayerScore(0);
  if (score[activePlayer] >= 100) {
    getPlayerElement(activePlayer).classList.add('player--winner');
    getPlayerElement(activePlayer).classList.remove('player--active');
    diceEl.classList.add('hidden');
    roleBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
    return;
  }
  switchPlayer();
}

function switchPlayer() {
  getPlayerElement(activePlayer).classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  getPlayerElement(activePlayer).classList.add('player--active');
  updateCurrentPlayerScore(0);
}

function updateCurrentPlayerScore(score) {
  getCurrentScoreElement(activePlayer).textContent = score;
}

function restGame() {
  getScoreElement(0).textContent = 0;
  getScoreElement(1).textContent = 0;
  getCurrentScoreElement(0).textContent = 0;
  getCurrentScoreElement(1).textContent = 0;
  currentScore = 0;
  activePlayer = Math.trunc(Math.random() * 2);
  getPlayerElement(0).classList.remove('player--winner', 'player--active');
  getPlayerElement(1).classList.remove('player--winner', 'player--active');
  getPlayerElement(activePlayer).classList.add('player--active');
  diceEl.classList.add('hidden');
  roleBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
}
