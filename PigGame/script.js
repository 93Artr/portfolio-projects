'use strict';

// DOM elements that display data
let currentP1 = document.getElementById('current--0');
let currentP2 = document.getElementById('current--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// dice setup
const dice = document.querySelector('.dice');
dice.classList.add('hidden');

// data setup
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// roll dice
const diceRoll = () => {
  if (playing) {
    if (dice.classList.contains('hidden')) dice.classList.remove('hidden');

    let roll = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${roll}.png`;

    // if roll is one switch player & current score, else continue rolling
    if (roll === 1) {
      switchPlayer();
    } else {
      currentScore += roll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
};

// add points to total score, update ui
const addPoints = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check for winner, else switch player
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .getElementById(`name--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
};

// set active player and update ui regarding it
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// reset data and ui for a new match
const newGame = () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .getElementById(`name--${activePlayer}`)
    .classList.remove('player--winner');

  activePlayer = 0;
  player0El.classList.toggle('player--active', true);
  player1El.classList.toggle('player--active', false);
  dice.classList.add('hidden');

  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  currentP1.textContent = 0;
  currentP2.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
};

// button eventlistener
btnRoll.addEventListener('click', diceRoll);
btnHold.addEventListener('click', addPoints);
btnNew.addEventListener('click', newGame);
