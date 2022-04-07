class Background {
  constructor() {
    this.background = new Sprite({
      position: { x: 0, y: 0 },
      imageSrc: '../img/background.png'
    });
    this.shop = new Sprite({
      position: { x: 600, y: 128 },
      imageSrc: '../img/shop.png',
      scale: 2.75,
      framesMax: 6
    });
  }

  update() {
    this.background.update();
    this.shop.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height);
  }
}
