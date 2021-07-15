'use strict';

let num = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;

function messageChange(message) {
  document.querySelector('.message').textContent = message;
}
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //console.log(guess, typeof guess);

  if (!guess) {
    messageChange('😢 No number entered');
    return;
  }

  if (guess === num) {
    messageChange('✨Correct Number✨');
    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = num;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    return;
  }

  if (guess > num && score > 1) {
    messageChange('📈Too High!!');
  } else if (score > 1 && guess < num) {
    messageChange('📉Too Low!!');
  } else {
    messageChange('😫You lost the game!!');
  }

  if (score > 0) {
    score--;
    document.querySelector('.score').textContent = score;
  }
});

document.querySelector('.again').addEventListener('click', function () {
  num = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  messageChange('Start guessing...');
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
});
