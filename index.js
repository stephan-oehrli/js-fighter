const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const groundOffset = 96;
const gravity = 0.7;
let timer = 60;
let isGameOver = false;

const background = new Background();

const playerOne = new Fighter({
  scale: 2.5,
  position: { x: 50, y: 0 },
  offset: { x: 215, y: 157 },
  sprites: prepareSprites(samuraiMackSprites),
  attackBox: {
    offset: { x: 100, y: 50 },
    width: 160,
    height: 50
  },
  keys: {
    left: { key: 'a', isPressed: false },
    right: { key: 'd', isPressed: false },
    jump: { key: 'w', isPressed: false },
    attack: { key: ' ', isPressed: false }
  },
  healthBarElementId: '#player-one-health',
  damage: 35
});

const playerTwo = new Fighter({
  scale: 2.5,
  position: { x: 920, y: 0 },
  offset: { x: 215, y: 167 },
  sprites: prepareSprites(kenjiSprites),
  attackBox: {
    offset: { x: -170, y: 50 },
    width: 150,
    height: 50
  },
  keys: {
    left: { key: 'ArrowLeft', isPressed: false },
    right: { key: 'ArrowRight', isPressed: false },
    jump: { key: 'ArrowUp', isPressed: false },
    attack: { key: 'ArrowDown', isPressed: false }
  },
  healthBarElementId: '#player-two-health',
  damage: 20
});

playerOne.setEnemy(playerTwo);
playerTwo.setEnemy(playerOne);

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  playerOne.update();
  playerTwo.update();

  if ( playerOne.health <= 0 || playerTwo.health <= 0 ) {
    determineWinner({ playerOne, playerTwo, timerId });
  }
}

decreaseTimer();
animate();
