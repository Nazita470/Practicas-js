//Elementos HTML
const tablero = document.querySelector(".contenedor-tablero")
const score = document.querySelector(".puntaje-actual span")

//Variables
let velocidadY = 0;
let velocidadX = 0;

let comidaX = 0;
let comidaY = 0;

let serpiente_col = 15;
let serpiente_row = 15;

let puntos = 0;

function cambiarPosisionComida(){
    comidaX =  Math.floor(Math.random() * 30)
    comidaY =  Math.floor(Math.random() * 30)
}

function reiniciar(){
    serpiente_col = 15
    serpiente_row = 15
    velocidadX = 0
    velocidadY = 0
    cambiarPosisionComida()
}
function mensajePerdiste(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Perdiste',
      })
}

function iniciarJuego(){
   let HTML = `<span style="background-color: red; grid-column: ${comidaX}; grid-row: ${comidaY};"></span>`

   serpiente_row += velocidadY
   serpiente_col += velocidadX

   if(serpiente_col == -1 ||  serpiente_col == 31 ||  serpiente_row == -1 ||  serpiente_row == 31) {
       
   } else if(serpiente_col == comidaX && serpiente_row == comidaY){
        cambiarPosisionComida()
        puntos++
        score.textContent = `${puntos}`
   }
   else {
    HTML += `<span style="background-color: aliceblue; grid-column: ${serpiente_col}; grid-row: ${serpiente_row};"></span>`
    tablero.innerHTML = HTML
   }

  
}

function cambiarValor(e){
    console.log(e.key)
    if(e.key == "ArrowUp"){
        velocidadY = -1
        velocidadX = 0   
    }else if(e.key == "ArrowDown"){
        velocidadY = 1
        velocidadX = 0
    }else if(e.key == "ArrowRight"){
        velocidadY = 0
        velocidadX = 1
    }else if(e.key == "ArrowLeft"){
        velocidadY = 0
        velocidadX = -1
    }

    iniciarJuego()
}

cambiarPosisionComida()

setInterval(iniciarJuego, 250)

document.addEventListener("keydown", cambiarValor)


