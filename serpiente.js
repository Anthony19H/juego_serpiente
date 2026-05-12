
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA =25;

   async function dibujarTablero() {
  ctx.strokeStyle = "#d84ff3";
  ctx.lineWidth = 1;
 
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    //await new Promise(resolve => setTimeout(resolve, 500));
  }
 
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
    //await new Promise(resolve => setTimeout(resolve, 500));
  }
}

function pintarParte(lineaX,lineaY){

  let valorX = lineaX * TAMANIO_CELDA;
  let valorY = lineaY * TAMANIO_CELDA;
  ctx.fillStyle ="red"
  ctx.fillRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA);
  ctx.strekeStyle ="blue";
  ctx.strokeRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA)
}
 
    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarParte(5,5);
      pintarParte(10,2);
      pintarParte((canvas.width-TAMANIO_CELDA)/25, (canvas.height-TAMANIO_CELDA)/25);
      pintarParte(7,(canvas.height-TAMANIO_CELDA)/25);
      pintarParte(0, (canvas.height-TAMANIO_CELDA)/25);
      pintarParte(0, 10);
      pintarParte((canvas.width-TAMANIO_CELDA)/25,0)
    }



