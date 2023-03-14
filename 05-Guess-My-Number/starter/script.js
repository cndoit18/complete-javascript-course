'use strict';

let guess = generate();

function generate() {
  let secretNumber = Math.trunc(Math.random() * 20) + 1;
  let score = 20;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';

  return (num, success, fail) => {
    if (score === 0) {
      return;
    }
    document.querySelector('.score').textContent = --score;
    if (num === secretNumber) {
      success(num, score);
      return;
    }
    fail(num > secretNumber);
    if (score === 0) {
      document.querySelector('.message').textContent = '💥 You lost the game!';
    }
  };
}

document.querySelector('.again').addEventListener('click', () => {
  guess = generate();
});

document.querySelector('.check').addEventListener('click', () => {
  guess(
    Number(document.querySelector('.guess').value),
    (num, score) => {
      document.querySelector('.message').textContent = '🎉 Correct Number!';
      document.querySelector('.number').textContent = num;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      let highscore = Number(document.querySelector('.highscore').textContent);
      if (highscore < score) {
        document.querySelector('.highscore').textContent = score;
      }
    },
    isLarge => {
      document.querySelector('.message').textContent = isLarge
        ? '📈 Too high!'
        : '📉 Too low!';
    }
  );
});
