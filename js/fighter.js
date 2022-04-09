class Fighter extends Sprite {
  constructor({
                position, sprites, scale = 1,
                velocity = { x: 0, y: 0 },
                offset = { x: 0, y: 0 },
                attackBox = { offset: {}, width: undefined, height: undefined },
                keys, healthBarElementId, damage
              }) {
    super({
      position, scale, offset,
      imageSrc: sprites.idle.imageSrc,
      framesMax: sprites.idle.framesMax
    });
    this.velocity = velocity;
    this.lastKey = undefined;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
    };
    this.isAttacking = false;
    this.health = 100;
    this.sprites = sprites;
    this.isDeath = false;
    this.movement = new PlayerMovement({ keys, fighter: this });
    this.healthBarElementId = healthBarElementId;
    this.damage = damage;
  }

  update() {
    this.draw();

    if ( !this.isDeath ) {
      this.animateFrames();
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    // gravity
    if ( this.position.y + this.height + this.velocity.y >= canvas.height - groundOffset ) {
      this.velocity.y = 0;
      this.position.y = canvas.height - groundOffset - this.height;
    } else {
      this.velocity.y += gravity;
    }
    this.velocity.x = 0;

    this.movement.update();
    this.detectAttack();
  }

  detectAttack() {
    const attackFrame = this.sprites.attack1.framesMax / 2;
    if ( isColliding({ rectangle1: this, rectangle2: this.enemy }) &&
        this.isAttacking && this.framesCurrent === attackFrame &&
        this.health > 0 && this.image === this.sprites['attack1'].image ) {
      this.enemy.takeHit(this.damage);
      this.isAttacking = false;
    }

    if ( this.isAttacking && this.framesCurrent === attackFrame ) {
      this.isAttacking = false;
    }
  }

  attack() {
    this.switchSprite('attack1');
    this.isAttacking = true;
  }

  takeHit(damage) {
    this.health -= damage;
    const healthBarWidth = this.health > 0 ? this.health : 0;
    gsap.to(this.healthBarElementId, { width: healthBarWidth + '%' });


    if ( this.health <= 0 ) {
      this.switchSprite('death');
    } else {
      this.switchSprite('takeHit');
    }
  }

  move(direction) {
    let XVelocityToAdd = direction === 'left' ? -5 : 5;
    if ( this.position.x + XVelocityToAdd > 0 && this.position.x + XVelocityToAdd < canvas.width - this.width ) {
      this.velocity.x = XVelocityToAdd;
      this.switchSprite('run');
    }
  }

  jump() {
    if ( this.velocity.y === 0 ) {
      this.velocity.y = -20;
    }
  }

  switchSprite(sprite) {
    if ( this.image === this.sprites.death.image ) {
      if ( this.framesCurrent === this.sprites.death.framesMax - 1 ) {
        this.isDeath = true;
      }
      return;
    }

    if (sprite === 'death') {
      return this.handleSpriteChange(this.sprites[sprite]);
    }

    if ( this.isAnimationInProgress('attack1') || this.isAnimationInProgress('takeHit') ) {
      return;
    }

    this.handleSpriteChange(this.sprites[sprite]);
  }

  handleSpriteChange(sprite) {
    if ( this.image !== sprite.image ) {
      this.image = sprite.image;
      this.framesMax = sprite.framesMax;
      this.framesCurrent = 0;
    }
  }

  isAnimationInProgress(sprite) {
    return this.image === this.sprites[sprite].image && this.framesCurrent < this.sprites[sprite].framesMax - 1;
  }

  setEnemy(enemy) {
    this.enemy = enemy;
  }
}
