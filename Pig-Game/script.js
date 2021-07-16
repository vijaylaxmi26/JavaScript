'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores = [0, 0];
let currentPlayer = 0;
let currentScore = 0;
let playing = true;

//stating conditions
const startConditions = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentPlayer = 0;
  currentScore = 0;
  playing = true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

startConditions();

const switchPlayer = function () {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionaliy
btnRoll.addEventListener('click', function () {
  if (!playing) {
    return;
  }

  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    //switch player
    switchPlayer();

    /*
    if (!currentPlayer) {
      player0El.classList.remove('player--active');
      player1El.classList.add('player--active');
      currentPlayer = 1;
    } else {
      player1El.classList.remove('player--active');
      player0El.classList.add('player--active');
      currentPlayer = 0;
    }
    */
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  scores[currentPlayer] += currentScore;
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];

  if (scores[currentPlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');

    diceEl.classList.add('hidden');

    playing = false;

    return;
  }

  switchPlayer();
});

btnNew.addEventListener('click', function () {
  startConditions();
});
