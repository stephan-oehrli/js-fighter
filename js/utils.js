function isColliding({ rectangle1, rectangle2 }) {
  return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ playerOne, playerTwo, timerId }) {
  clearTimeout(timerId);
  document.querySelector('#display-text').style.display = 'flex';
  if ( playerOne.health === playerTwo.health ) {
    document.querySelector('#display-text').innerHTML = 'Tie';
  } else if ( playerOne.health > playerTwo.health ) {
    document.querySelector('#display-text').innerHTML = 'Player 1 wins';
  } else if ( playerTwo.health > playerOne.health ) {
    document.querySelector('#display-text').innerHTML = 'Player 2 wins';
  }
}

let timerId;
function decreaseTimer() {
  if ( timer > 0 ) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector('#timer').innerHTML = `${timer}`;
  }

  if ( timer === 0 ) {
    determineWinner({ playerOne, playerTwo, timerId });
  }
}

function prepareSprites(sprites) {
  for ( const sprite in sprites ) {
    sprites[sprite].image = new Image();
    sprites[sprite].image.src = sprites[sprite].imageSrc;
  }
  return sprites;
}
