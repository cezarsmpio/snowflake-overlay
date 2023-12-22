import "./style.css";

const PARAMS = new URLSearchParams(window.location.search);

const DEFAULT_FLAKES = 300;
const MAX_FLAKES = 1000;
const FLAKES = Number(PARAMS.get("flakes") ?? DEFAULT_FLAKES);

const DEFAULT_SPEED = 0.5;
const DEFAULT_SIZE = 1;
const DEFAULT_WIND = 1;

const FLAKES_FACTOR = FLAKES > MAX_FLAKES ? MAX_FLAKES : FLAKES;
const SPEED_FACTOR = Number(PARAMS.get("speed") ?? DEFAULT_SPEED);
const SIZE_FACTOR = Number(PARAMS.get("size") ?? DEFAULT_SIZE);
const WIND_FACTOR = Number(PARAMS.get("wind") ?? DEFAULT_WIND);

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

function createSnowFlake() {
  return {
    x: Math.random() * canvas.width,
    y: 0,
    radius: Math.random() * SIZE_FACTOR,
    speed: Math.random() * SPEED_FACTOR,
    opacity: Math.random(),
    blur: Math.random() * 1,
  };
}

const snowFlakes: ReturnType<typeof createSnowFlake>[] = [];

for (let i = 0; i < FLAKES_FACTOR; i++) {
  snowFlakes.push(createSnowFlake());
}

function drawSnowFlake(snowFlake: any) {
  if (!ctx) return;

  ctx.beginPath();
  ctx.arc(snowFlake.x, snowFlake.y, snowFlake.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${snowFlake.opacity})`;
  ctx.fill();
}

function moveSnowFlake(snowFlake: any) {
  snowFlake.y += snowFlake.speed;
  snowFlake.x += (snowFlake.speed * Math.random() * WIND_FACTOR) / 2;
  if (snowFlake.y > canvas.height) {
    snowFlake.y = 0;
  }
  if (snowFlake.x > canvas.width) {
    snowFlake.x = 0;
  }
}

function animateSnowFall() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowFlakes.forEach(drawSnowFlake);
  snowFlakes.forEach(moveSnowFlake);
  requestAnimationFrame(animateSnowFall);
}

animateSnowFall();
