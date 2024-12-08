const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 526;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const GROUND = 72;
const START_SPEED = 3;
const SPRITE_FPS = 5;
const SPAWN_INTERVAL = 6000;
const MIN_DISTANCE = 300;

let score = 0;
let gameTicks = 0;
let obstacles = [];
let lastObstacle = 0;
let gameSpeed = START_SPEED;

let keys = {
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  KeyA: {
    pressed: false,
  },
  KeyD: {
    pressed: false,
  },
};

const player = new Player(
  { x: 100, y: 0 },
  {
    Run: {
      src: "img/fighter/Run.png",
      totalFrames: 8,
    },
    RunLeft: {
      src: "img/fighter/RunLeft.png",
      totalFrames: 8,
    },
    Idle: {
      src: "img/fighter/Idle.png",
      totalFrames: 6,
    },
    IdleLeft: {
      src: "img/fighter/IdleLeft.png",
      totalFrames: 6,
    },
    Jump: {
      src: "img/fighter/Jump.png",
      totalFrames: 10,
      spriteFPS: 15,
    },
    JumpLeft: {
      src: "img/fighter/JumpLeft.png",
      totalFrames: 10,
      spriteFPS: 15,
    },
    Attack: {
      src: "img/fighter/Attack_3.png",
      totalFrames: 4,
      spriteFPS: 12,
    },
    AttackLeft: {
      src: "img/fighter/Attack_3Left.png",
      totalFrames: 4,
      spriteFPS: 12,
    },
  },
  { h: 128, w: 128 }
);

const player2 = new Player(
  { x: 800, y: 0 },
  {
    Run: {
      src: "img/samurai/Run.png",
      totalFrames: 8,
    },
    RunLeft: {
      src: "img/samurai/RunLeft.png",
      totalFrames: 8,
    },
    Idle: {
      src: "img/samurai/Idle.png",
      totalFrames: 6,
    },
    IdleLeft: {
      src: "img/samurai/IdleLeft.png",
      totalFrames: 6,
    },
    Jump: {
      src: "img/samurai/Jump.png",
      totalFrames: 12,
    },
    JumpLeft: {
      src: "img/samurai/JumpLeft.png",
      totalFrames: 12,
    },
    Attack: {
      src: "img/samurai/Attack_1.png",
      totalFrames: 6,
    },
    AttackLeft: {
      src: "img/samurai/Attack_1Left.png",
      totalFrames: 6,
    },
  },
  { h: 128, w: 128 }
);
player2.faceDirection = "left";

const backgroundImage = new Image();
backgroundImage.src = "img/background.png";

function showScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function spawnObstacle() {
  const now = Date.now();
  if (now - lastObstacle >= SPAWN_INTERVAL / gameSpeed) {
    const obstacle = new Obstacle({
      x: canvas.width,
      y: canvas.height - GROUND,
    });
    obstacles.push(obstacle);
    lastObstacle = now;
  }
}

function updateObstacles() {
  // move obstacles
  for (let obstacle of obstacles) {
    obstacle.update();
  }

  // remove offscreen obstacles and add score
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].position.x + OBSTACLE_WIDTH < 0) {
      obstacles.splice(i, 1);
      score++;
      if (score !== 0 && score % 10 === 0 && gameSpeed < 9) {
        gameSpeed += 1;
      }
    }
  }
}

function detectCollision() {
  for (let obstacle of obstacles) {
    if (
      player.position.x + WIDTH > obstacle.position.x - 1 &&
      player.position.x < obstacle.position.x + OBSTACLE_WIDTH &&
      player.position.y + HEIGHT > obstacle.position.y - 1 &&
      player.position.y < obstacle.position.y + OBSTACLE_HEIGHT
    ) {
      alert("Game Over! Your score: " + score);
      location.reload();
      return;
    }
  }
}

function gameLoop() {
  // Reset Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Gravity pull
  player.update();
  player2.update();

  player.stop();
  player2.stop();

  if (keys.ArrowRight.pressed) player.moveRight();
  if (keys.ArrowLeft.pressed) player.moveLeft();
  if (keys.KeyD.pressed) player2.moveRight();
  if (keys.KeyA.pressed) player2.moveLeft();

  // Draw score
  showScore();
  // increase gameTicks
  gameTicks++;
  // GameLoop
  requestAnimationFrame(gameLoop);
}

gameLoop();

addEventListener("keydown", (event) => {
  console.log(event.code);
  switch (event.code) {
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
    case "ArrowUp":
      player.jump();
      break;

    case "KeyA":
      keys.KeyA.pressed = true;
      break;
    case "KeyD":
      keys.KeyD.pressed = true;
      break;
    case "KeyW":
      player2.jump();
      break;
  }
});

addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "KeyA":
      keys.KeyA.pressed = false;
      break;
    case "KeyD":
      keys.KeyD.pressed = false;
      break;
  }
});
