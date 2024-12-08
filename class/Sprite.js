class Sprite {
  constructor(spriteDetails, position, dimensions) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = spriteDetails.src;
    this.spriteTotalFrames = spriteDetails.totalFrames;
    this.position = position;
    this.dimensions = dimensions;
    this.currentIndex = 0;
    this.spriteFPS = spriteDetails.spriteFPS || SPRITE_FPS;
  }

  draw() {
    // ctx.fillRect(
    //   this.position.x + 30,
    //   this.position.y + 48,
    //   this.dimensions.w - 70,
    //   this.dimensions.h - 48
    // );
    ctx.drawImage(
      this.spriteSheet,
      this.currentIndex * this.dimensions.w,
      0,
      this.dimensions.w,
      this.dimensions.h,
      this.position.x,
      this.position.y,
      this.dimensions.w,
      this.dimensions.h
    );
  }

  update() {
    this.draw();
    this.currentIndex =
      Math.floor(gameTicks / this.spriteFPS) % this.spriteTotalFrames;
  }
}
