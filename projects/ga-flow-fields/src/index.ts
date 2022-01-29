import { createCanvas } from "ga-canvas";

const { canvas, context: ctx } = createCanvas();
if (ctx === null) {
  window.stop();
  throw new Error("Unable to get canvas context.");
}
console.log("test");

document.body.appendChild(canvas);

const height = window.innerHeight * 0.9;

canvas.width = height / Math.sqrt(2);
canvas.height = height;

let strokeLength = 50;
ctx.lineCap = "round";

const colors: Record<number, string> = {
  0: `hsl(${42}, 100%,72%, 50%)`,
  1: `hsl(${295}, 50%,60%, 50%)`,
  2: `hsl(${231}, 50%,60%, 50%)`,
  3: `hsl(${332}, 50%,60%, 50%)`,
};

const count = 10000;
for (let n = 0; n < count; n++) {
  const x = Math.random() * canvas.width * 0.95;
  const y = Math.random() * canvas.height * 0.95;

  if (y < 50) continue;
  if (y > canvas.height - 50) continue;
  // if (Math.tan(y * 0.0058) > 5) continue;

  let value = getValue(x, y);
  ctx.save();
  ctx.translate(x, y);
  strokeLength = Math.random() * 10 + 30;
  ctx.strokeStyle = colors[Math.floor(Math.random() * 4)];
  ctx.lineWidth = Math.random() * 2;
  // if (Math.random() < 0.02) ctx.lineWidth = 5;

  render(ctx, value);
  ctx.restore();
}

function getValue(x: number, y: number): number {
  return (Math.tan(x * 0.0085) + Math.sin(y * 0.0058)) * 0.1 * Math.PI * 2;
}

function render(ctx: CanvasRenderingContext2D, value: number) {
  ctx.rotate(value);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineWidth = 1;
  for (let s = 0; s < strokeLength; s += 1) {
    ctx.lineTo(1, 1);
    ctx.lineWidth = Math.random() * 3;
    ctx.moveTo(s, 0);
  }
  ctx.stroke();
}
