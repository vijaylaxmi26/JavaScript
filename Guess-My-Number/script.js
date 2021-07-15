'use strict';

const num = Math.trunc(Math.random() * 20) + 1;

document.querySelector('.number').textContent = num;

let score = 20;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '😢 No number entered';
    return;
  }

  if (guess === num) {
    document.querySelector('.message').textContent = '✨Correct Number✨';
    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';
    return;
  }

  if (guess > num && score > 1) {
    document.querySelector('.message').textContent = '📈Too High!!';
  } else if (score > 1 && guess < num) {
    document.querySelector('.message').textContent = '📉Too Low!!';
  } else {
    document.querySelector('.message').textContent = '😫You lost the game!!';
  }

  if (score > 0) {
    score--;
    document.querySelector('.score').textContent = score;
  }
});
