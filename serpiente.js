
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA =25;

    function dibujarTablero(){
      ctx.strokeStyle = "pink";
      ctx.beginPath();//empieza a dibujar el canva
      ctx.moveTo(0,0);//donde empiza a dibujar
      ctx.lineTo(100,100);//hasta donde dibujar
      ctx.stroke();//pinta contorno
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
      dibujarTablero2();
    }



