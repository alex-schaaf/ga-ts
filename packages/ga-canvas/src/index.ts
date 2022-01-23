export function createCanvas(): {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
} {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  return { canvas, context };
}
