
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
    await new Promise(resolve => setTimeout(resolve, 500));
  }
 
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
    function dibujarTablero2(){
      for(let i = 0; i<canvas.width;i+=TAMANIO_CELDA){
        ctx.strokeStyle = "pink";
        ctx.beginPath();//empieza a dibujar el canva
        ctx.moveTo(i,0);//donde empiza a dibujar
        ctx.lineTo(i,canvas.height);//hasta donde dibujar
        ctx.stroke();//pinta contorno
      }
      for(let i =0;i<canvas.height;i+=TAMANIO_CELDA){
        ctx.strokeStyle = "pink";
        ctx.beginPath();//empieza a dibujar el canva
        ctx.moveTo(0,i);//donde empiza a dibujar
        ctx.lineTo(canvas.width,i);//hasta donde dibujar
        ctx.stroke();//pinta contorno
      }
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
    }



