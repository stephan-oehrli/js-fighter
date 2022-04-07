class PlayerMovement {
  constructor({ keys, fighter }) {
    this.keys = keys;
    this.figther = fighter;
    this.registerEventListeners();
  }

  update() {
    if ( this.keys.left.isPressed && this.figther.lastKey === this.keys.left.key ) {
      this.figther.velocity.x = -5;
      this.figther.switchSprite('run');
    } else if ( this.keys.right.isPressed && this.figther.lastKey === this.keys.right.key ) {
      this.figther.velocity.x = 5;
      this.figther.switchSprite('run');
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
      if ( !this.figther.isDeath ) {
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
            this.figther.velocity.y = -20;
            break;
          case this.keys.attack.key:
            this.figther.attack();
            break;
        }
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
