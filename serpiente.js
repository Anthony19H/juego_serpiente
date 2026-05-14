
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    let puntaje = 0;
    let comidas = false;
    const TAMANIO_CELDA = 25;
    const SERPIENTE = [
      {x:11,y:11},
      {x:11,y:10},
      {x:10,y:10},
      {x:9,y:10},
    ]

    let comida ={
      comidaX:5,
      comidaY:5
    }

    let direccionActual ="derecha";

    generarComida();
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
      pintarSerpiente();
      pintarComida();
    }

  function pintarSerpiente(){
      for(let i =0; i< SERPIENTE.length; i++){
        let  elemento = SERPIENTE[i];
        if(i == 0 ){
          pintarParte(elemento.x,elemento.y,"yellow");
        }else{
        pintarParte(elemento.x,elemento.y,"red");
        }
      }
    }



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

function pintarParte(lineaX,lineaY,color){

  let valorX = lineaX * TAMANIO_CELDA;
  let valorY = lineaY * TAMANIO_CELDA;
  ctx.fillStyle = color
  ctx.fillRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA);
  ctx.strokeStyle ="blue";
  ctx.strokeRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA)
}


function moverDerecha(){
  let cabezaActual = SERPIENTE[0];
  let nuevaCabeza = {
    x: cabezaActual.x +1,
    y: cabezaActual.y
}
  SERPIENTE.unshift(nuevaCabeza);
  
  SERPIENTE.pop();
}
  

function moverIzquierda(){
  let cabezaActual = SERPIENTE[0];
  let nuevaCabeza = {
    x: cabezaActual.x -1,
    y: cabezaActual.y
}
  SERPIENTE.unshift(nuevaCabeza);
  
  SERPIENTE.pop();
}

function moverArriba(){
  let cabezaActual = SERPIENTE[0];
  let nuevaCabeza = {
    x: cabezaActual.x ,
    y: cabezaActual.y -1
}
  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();
}
 
function moverAbajo(){
  let cabezaActual = SERPIENTE[0];
  let nuevaCabeza = {
    x: cabezaActual.x ,
    y: cabezaActual.y + 1
}
  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();
}

function cambiarDireccion(direccion){
 switch (direccion){
  case "derecha":
    direccionActual = "derecha";
    break;
  case "izquierda":
    direccionActual = "izquierda";
    break;
  case "arriba":
    direccionActual = "arriba";
    break;
  case "abajo":
    direccionActual = "abajo";
    break;
 }
 dibujarTodo();
}


function iniciarJuego(){
  intervaloSerpiente=setInterval(moverSerpiente,1000);
}

function pausarJuego(){
  clearInterval(intervaloSerpiente);
}

function moverSerpiente(){
  let ultimaParte = SERPIENTE[SERPIENTE.length-1];
  console.log("moviendo");
  switch (direccionActual){
    case "derecha":
      moverDerecha();
      break;
    case "izquierda":
      moverIzquierda();
      break;
    case "arriba":
      moverArriba();
      break;
    case "abajo":
      moverAbajo();
      break
  }
  if(atrapaComida() == true){
    puntaje += 1;
    document.getElementById("puntaje").innerHTML = puntaje;
    SERPIENTE.push(ultimaParte);
    generarComida();

  }
  dibujarTodo();
  
}
function generarComida(){
  let totalColumnas = canvas.width/TAMANIO_CELDA;
  let totalFilas = canvas.height/TAMANIO_CELDA;

  comida.comidaX = Math.floor(Math.random()*totalColumnas);
  comida.comidaY = Math.floor(Math.random()*totalFilas );
}
function pintarComida(){
  
  pintarParte(comida.comidaX,comida.comidaY,"#05c9fa");
}

function atrapaComida(){
  const CABEZA = SERPIENTE[0];
  if(CABEZA.x == comida.comidaX && CABEZA.y == comida.comidaY){
    return true;
  }
  return false;
}
