const canvas = document.getElementById('canvas');
const board = document.getElementById('score-board');
const table = document.getElementById('player-table');
const ctx = canvas.getContext('2d');
const color = 'lime';
const size = 10;

document.addEventListener('keydown', keydownHandler, false);
document.addEventListener('keyup', keyupHandler, false);

const Target = {
  w: size,
  h: size,
  x: size * 10,
  y: size * 10,
  spawn(posX = this.x, posY = this.y) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(posX, posY, this.w, this.h);
  },
};

const Game = {
  score: 0,
  player: 'Player',
  updateScore(val) {
    if (val !== 'init') this.score += 1;
    board.innerHTML = `${this.player}'s score: <b>${this.score}</b>`
  }
}

const Player = {
  w: size,
  h: size,
  s: size,
  x: size,
  y: size,
  moveUp() {
    if (this.y > 0) this.y -= this.s;
  },
  moveDown() {
    if (this.y + this.s < canvas.height) this.y += this.s;
  },
  moveLeft() {
    if (this.x > 0) this.x -= this.s;
  },
  moveRight() {
    if (this.x + this.s < canvas.width) this.x += this.s;
  },
  spawn(posX = this.x, posY = this.y) {
    ctx.fillStyle = color;
    ctx.fillRect(posX, posY, this.w, this.h);

    if (posX === Target.x && posY === Target.y) moveTarget();
  },
};

function moveTarget() {
  Game.updateScore();
  const { x, y } = getRandomPosition(Target.w, Target.h);
  Target.x = x;
  Target.y = y;
}

function boardOutput(text) {
  board.innerHTML += `<p>${text}</p>`;
}

function keydownHandler(ev) {
  const { keyCode } = ev;
  if (keyCode === 37 || keyCode === 65) Player.moveLeft();
  if (keyCode === 38 || keyCode === 87) Player.moveUp();
  if (keyCode === 39 || keyCode === 68) Player.moveRight();
  if (keyCode === 40 || keyCode === 83) Player.moveDown();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function keyupHandler(ev) {}

function draw() {
  clearCanvas();

  Target.spawn();
  Player.spawn();

  requestAnimationFrame(draw);
}

function getRandomPosition(w, h) {
  const limitX = canvas.width - w;
  const limitY = canvas.height - h;
  const posX = Math.floor(Math.random() * (limitX / w)) * w;
  const posY = Math.floor(Math.random() * (limitY / h)) * h;
  return { x: posX, y: posY };
}

Game.updateScore('init');
requestAnimationFrame(draw);
