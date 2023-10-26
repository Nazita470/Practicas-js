//Elementos HTML
const tablero = document.querySelector(".contenedor-tablero")
const score = document.querySelector(".puntaje-actual span")
const scoreMax = document.querySelector(".puntaje-record span")

//Variables
let velocidadY = 0;
let velocidadX = 0;

let comidaX = 0;
let comidaY = 0;

let serpiente_col = 15;
let serpiente_row = 15;

let puntos = 0;

let snakeBody = []

function cambiarPosisionComida(){
    comidaX =  Math.floor(Math.random() * 30) + 1
    comidaY =  Math.floor(Math.random() * 30) + 1
}

function reiniciar(){
    //clearInterval(setIntervalID)
    serpiente_col = 15
    serpiente_row = 15
    velocidadX = 0
    velocidadY = 0
    puntos = 0
    score.textContent = "0"
    snakeBody = []
    cambiarPosisionComida()
    location.reload()
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
    //console.log(snakeBody[0])

    if(serpiente_col == comidaX && serpiente_row == comidaY){
        snakeBody.push([comidaX, comidaY])
        cambiarPosisionComida()
        puntos++
        score.textContent = `${puntos}`
    } 
    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }

   snakeBody[0] = [serpiente_col, serpiente_row]
     
   serpiente_row += velocidadY
   serpiente_col += velocidadX


   if(serpiente_col < 0 ||  serpiente_col > 30 ||  serpiente_row < 0 ||  serpiente_row > 30) {
    if(puntos > parseInt(scoreMax.textContent)){
        scoreMax.textContent = puntos
      }
      alert("Perdiste")
       reiniciar()
     
   }
    
    for(let i = 0; i < snakeBody.length; i++) {
        console.log(snakeBody)
        HTML += `<span style="background-color: aliceblue; grid-column: ${snakeBody[i][0]}; grid-row: ${snakeBody[i][1]};"></span>`
        if(i != 0 && snakeBody[i][0] == snakeBody[0][0] && snakeBody[i][1] == snakeBody[0][1]){
            if(puntos > parseInt(scoreMax.textContent)){
                scoreMax.textContent = puntos
              }
              alert("Perdiste")
               reiniciar()
             
        }
    }

    tablero.innerHTML = HTML
   

   
  
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


