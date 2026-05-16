
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    let puntaje = 0;
    let velocidad =300;
    let mejorPuntaje = localStorage.getItem("recordSerpiente") || 0; 
// Mostramos ese récord en la pantalla apenas carga el juego
    document.getElementById("mejor-puntaje").innerHTML = mejorPuntaje;
    let direccionActual ="derecha";
    let direccionCambiadaEnEsteTurno = false;
    const TAMANIO_CELDA = 25;
    let intervaloSerpiente;
    let SERPIENTE = [
      {x:11,y:11},
      {x:11,y:10},
      {x:10,y:10},
      {x:9,y:10},
    ]

    let comida ={
      comidaX:5,
      comidaY:5
    }

    

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
  if(direccionCambiadaEnEsteTurno == true){
    return;
  }
 if (direccionActual == "derecha" && direccion == "izquierda") {
    return; // Ignora la orden y sale de la función
  }
  
  // Si va a la izquierda, bloqueamos la derecha
  if (direccionActual == "izquierda" && direccion == "derecha") {
    return;
  }
  
  // Si va hacia arriba, bloqueamos abajo
  if (direccionActual == "arriba" && direccion == "abajo") {
    return;
  }
  
  // Si va hacia abajo, bloqueamos arriba
  if (direccionActual == "abajo" && direccion == "arriba") {
    return;
  }

  // Si pasa todos los filtros, el cambio de dirección es seguro y se aplica
  direccionActual = direccion;

  direccionCambiadaEnEsteTurno = true;
}


function iniciarJuego(){
  clearInterval(intervaloSerpiente);
  intervaloSerpiente=setInterval(moverSerpiente,velocidad);
  document.getElementById("estado").innerHTML = "Jugando";
  document.getElementById("btn-iniciar").disabled = true;
  
}

function pausarJuego(){
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").innerHTML = "Pausado";
  document.getElementById("btn-iniciar").disabled = false;
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
    puntaje += 100;
    document.getElementById("puntaje").innerHTML = puntaje;
    SERPIENTE.push(ultimaParte);
    generarComida();
  }

  if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje; // Actualizamos la variable
      // Lo guardamos en la "tarjeta de memoria" del navegador
      localStorage.setItem("recordSerpiente", mejorPuntaje); 
      // Lo actualizamos en la pantalla
      document.getElementById("mejor-puntaje").innerHTML = mejorPuntaje; 
    }

  verificarColisionSerpiente();
  verificarCondicionBorde();

  if (document.getElementById("estado").innerHTML === "GAME OVER") {
    dibujarTodo(); // Primero dibuja el tablero y la serpiente muerta de fondo
    pintarPantallaGameOver(); // Y encima estampa el cartel oscuro con letras rojas
  } else {
    // Si sigo vivo, dibuja el juego avanzando de forma normal
    dibujarTodo();
  }
  
  direccionCambiadaEnEsteTurno =false;
}

function verificarCondicionBorde(){
  let cabezaSerpiente = SERPIENTE[0];
  if(cabezaSerpiente.x >= canvas.width/TAMANIO_CELDA || 
    cabezaSerpiente.x < 0 || cabezaSerpiente.y <0 || 
    cabezaSerpiente.y >= canvas.height/TAMANIO_CELDA){
    pausarJuego();
    document.getElementById("estado").innerHTML = "GAME OVER";
    gestionarBotones(true);
  }
}

function verificarColisionSerpiente(){
  let CABEZA = SERPIENTE[0];
  for(let i=3;i<SERPIENTE.length;i++){
    let segmento =SERPIENTE[i];
    if(CABEZA.x == segmento.x && CABEZA.y == segmento.y){
      pausarJuego();
    document.getElementById("estado").innerHTML = "GAME OVER";
    gestionarBotones(true);
    }
  }
  
}

function reiniciarJuego(){
  pausarJuego()
  puntaje = 0;
  document.getElementById("puntaje").innerHTML = puntaje;
  document.getElementById("estado").innerHTML = "Listo";
  direccionActual = "derecha";
  SERPIENTE = [
      {x:11,y:11},
      {x:11,y:10},
      {x:10,y:10},
      {x:9,y:10},
    ]
    ;
    gestionarBotones(false)
    generarComida();
    dibujarTodo();
}

function gestionarBotones(deshabilitar){
const botones = document.querySelectorAll(".btn-juego");
  botones.forEach(boton => {
    boton.disabled = deshabilitar;
  });
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


// ==========================================
// CONTROL POR TECLADO
// ==========================================

window.addEventListener("keydown", function(evento) {
  // Si el juego no está en estado "Jugando", ignoramos las teclas
  if (document.getElementById("estado").innerHTML !== "Jugando") {
    return;
  }

  // Evaluamos cuál tecla se presionó
  switch (evento.key) {
    case "ArrowUp":    // Flecha Arriba
    case "w":          // Tecla W (por si acaso)
      cambiarDireccion("arriba");
      break;
    case "ArrowDown":  // Flecha Abajo
    case "s":          // Tecla S
      cambiarDireccion("abajo");
      break;
    case "ArrowLeft":  // Flecha Izquierda
    case "a":          // Tecla A
      cambiarDireccion("izquierda");
      break;
    case "ArrowRight": // Flecha Derecha
    case "d":          // Tecla D
      cambiarDireccion("derecha");
      break;
  }
});


function pintarPantallaGameOver() {
  // 1. Capa oscura semitransparente (Rojo:0, Verde:0, Azul:0 es Negro, Opacidad: 0.8)
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Configuración del título principal "GAME OVER"
  ctx.fillStyle = "red"; // Letras de color rojo llamativo
  ctx.font = "bold 50px 'Courier New', Courier, monospace"; // Fuente pixelada
  ctx.textAlign = "center"; // Centrado horizontal
  ctx.textBaseline = "middle"; // Centrado vertical

  // 3. Estampamos el texto en el centro exacto del lienzo
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

  // 4. Subtexto informativo en color blanco para que resalte
  ctx.fillStyle = "white";
  ctx.font = "bold 20px 'Courier New', Courier, monospace";
  ctx.fillText("Presiona 'Reiniciar' para volver a comenzar", canvas.width / 2, canvas.height / 2 + 40);
}
