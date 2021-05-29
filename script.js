'use strict';
//selecting score elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// dice
const diceEl = document.querySelector('.dice');
// btns
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// player
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
// roll the dice
btnRoll.addEventListener('click', function (e) {
  if (playing) {
    // 1.generate random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    // 2. display
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check if roll 1
    if (dice !== 1) {
      //   add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore; //change later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // finish
    else {
      switchPlayer();
    }
  }
  // switch to the next player
});
btnNew.addEventListener('click', init);
let scores, activePlayer, playing, currentScore;
function init() {
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  currentScore = 0;
  // Starting condition
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  //   score0El.textContent = 0;
  //   score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
}
init();
