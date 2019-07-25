export default function(ctx, { action, params }) {
  if (params.clearFirst) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  if (params.composite) {
    ctx.globalCompositeOperation = params.composite;
  } else {
    ctx.globalCompositeOperation = "source-over";
  }

  if (action === "move") {
    const data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.putImageData(
      data,
      params.dest[0] - params.orig[0],
      params.dest[1] - params.orig[1]
    );
  }

  ctx.beginPath();
  ctx.moveTo(params.orig[0], params.orig[1]);

  switch (action) {
    case "drawLine":
      ctx.lineTo(params.dest[0], params.dest[1]);
      return ctx.stroke();

    case "drawLineArray":
      params.destArray.forEach(dest => {
        ctx.lineTo(dest[0], dest[1]);
      });
      return ctx.stroke();

    case "drawRect":
      ctx.rect(
        params.orig[0],
        params.orig[1],
        params.dest[0] - params.orig[0],
        params.dest[1] - params.orig[1]
      );
      return ctx.stroke();

    case "fillRect":
      ctx.rect(
        params.orig[0],
        params.orig[1],
        params.dest[0] - params.orig[0],
        params.dest[1] - params.orig[1]
      );
      return ctx.fill();

    default:
      return "error: invalid draw action";
  }
}
