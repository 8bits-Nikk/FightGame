const HEIGHT = 50;
const WIDTH = 50;
const GRAVITY = 0.4;
const SPEED = 2;

const spriteWidth = 1600 / 8; // Width of a single frame in the sprite
const spriteHeight = 200; // Height of a single frame in the sprite
const spriteFrames = 8; // Total number of frames in the sprite

class Player {
  constructor(position, spritesList, dimensions) {
    this.position = position;
    this.velocity = { x: 0, y: 1 };
    this.dimensions = dimensions;
    this.spritesList = {};
    Object.keys(spritesList).forEach((action) => {
      this.spritesList[action] = {
        spriteSheet: new Sprite(spritesList[action], position, dimensions),
      };
    });

    this.currentAction = "Idle";
    this.faceDirection = "right";
  }

  draw() {
    this.spritesList[this.currentAction].spriteSheet.draw();
  }

  pullDownPlayer() {
    this.position.y += this.velocity.y;
    this.velocity.y += GRAVITY;
    if (this.position.y + this.dimensions.h >= canvas.height - GROUND) {
      this.velocity.y = 0;
      this.position.y = canvas.height - this.dimensions.h - GROUND;
    }
  }

  stop() {
    if (this.velocity.y !== 0) {
      if (this.faceDirection === "right") this.currentAction = "Jump";
      else this.currentAction = "JumpLeft";
    } else if (this.faceDirection === "right") this.currentAction = "Idle";
    else this.currentAction = "IdleLeft";
    this.velocity.x = 0;
  }

  moveRight() {
    if (this.velocity.y === 0) this.currentAction = "Run";
    this.faceDirection = "right";
    this.velocity.x = SPEED;
  }

  moveLeft() {
    if (this.velocity.y === 0) this.currentAction = "RunLeft";
    this.faceDirection = "left";
    this.velocity.x = -SPEED;
  }

  jump() {
    if (this.faceDirection === "right") this.currentAction = "Jump";
    else this.currentAction = "JumpLeft";
    if (this.position.y + this.dimensions.h < canvas.height - GROUND) return;
    this.velocity.y -= 12;
  }

  attack() {
    if (this.faceDirection === "right") this.currentAction = "AttackRight";
    else this.currentAction = "AttackLeft";
  }

  update() {
    this.spritesList[this.currentAction].spriteSheet.update();
    this.pullDownPlayer();
    this.position.x += this.velocity.x;
  }
}
