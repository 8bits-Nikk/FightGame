const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 50;

class Obstacle {
  constructor(position) {
    this.position = position;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x,
      this.position.y - OBSTACLE_HEIGHT,
      OBSTACLE_WIDTH,
      OBSTACLE_HEIGHT
    );
  }

  update() {
    this.draw();
    this.position.x -= gameSpeed;
  }
}
