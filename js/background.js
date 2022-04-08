class Background {
  constructor() {
    this.background = new Sprite({
      position: { x: 0, y: 0 },
      imageSrc: './img/background.png'
    });
    this.shop = new Sprite({
      position: { x: 600, y: 128 },
      imageSrc: './img/shop.png',
      scale: 2.75,
      framesMax: 6
    });
    this.latern = new Sprite({
      position: { x: 10, y: 200},
      imageSrc: './img/street light.png',
      scale: 2.2,
      framesMax: 10,
      framesHold: 25
    });
  }

  update() {
    this.background.update();
    this.shop.update();
    this.latern.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height);
  }
}
