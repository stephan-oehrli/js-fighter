class PlayerMovement {
  constructor({ keys, fighter }) {
    this.keys = keys;
    this.figther = fighter;
    this.registerEventListeners();
  }

  update() {
    if ( this.keys.left.isPressed && this.figther.lastKey === this.keys.left.key ) {
      this.figther.move('left');
    } else if ( this.keys.right.isPressed && this.figther.lastKey === this.keys.right.key ) {
      this.figther.move('right');
    } else {
      this.figther.switchSprite('idle');
    }

    if ( this.figther.velocity.y < 0 ) {
      this.figther.switchSprite('jump');
    } else if ( this.figther.velocity.y > 0 ) {
      this.figther.switchSprite('fall');
    }
  }

  registerEventListeners() {
    window.addEventListener('keydown', (event) => {
      if ( this.figther.image !== this.figther.sprites.death.image && timer > 0 ) {
        switch ( event.key ) {
          case this.keys.right.key:
            this.keys.right.isPressed = true;
            this.figther.lastKey = this.keys.right.key;
            break;
          case this.keys.left.key:
            this.keys.left.isPressed = true;
            this.figther.lastKey = this.keys.left.key;
            break;
          case this.keys.jump.key:
            this.keys.jump.isPressed = true;
            this.figther.jump();
            break;
          case this.keys.attack.key:
            this.figther.attack();
            break;
        }
      }

      if (isGameOver && event.key === 'Enter') {
        window.location.reload();
      }
    });

    window.addEventListener('keyup', (event) => {
      switch ( event.key ) {
        case this.keys.right.key:
          this.keys.right.isPressed = false;
          break;
        case this.keys.left.key:
          this.keys.left.isPressed = false;
          break;
      }
    });
  }
}
