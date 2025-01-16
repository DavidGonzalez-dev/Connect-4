//! Declaration of the dimensions of the board
const nColumns = 7
const nRows = 6
let board = document.getElementById('game-board')
let titlePlayer = document.getElementById('turn')

//! Declaration of the types of slots
const slotTypes = {
    empty: 0,
    yellow: 1,
    red: 2
}


//* Declares of the game variables
let boardMap
let score = JSON.parse(localStorage.getItem('score')) || { red: 0, yellow: 0 }
let currentPlayer

// This function initizalize the game variables
function setGame(){
  boardMap  = Array.from(new Array(nRows), () => new Array(nColumns).fill(slotTypes.empty))
  currentPlayer = slotTypes.yellow
  createBoard(boardMap)
}

// This function creates a div with the class slot and inside it a div with the class emptySlot
function crateEmptySlot() {
    // Se Crea el Slot
    let slot = document.createElement('div')
    slot.classList.add('slot')
    // Se crea un empty slot
    let emptySlot = document.createElement('div')
    emptySlot.classList.add('empty-slot')

    slot.appendChild(emptySlot)

    return slot
}


// This function creates elements in the DOM and apends them into the board in order to paint them in the screen.
function createBoard(boardMap) {

    boardMap.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            let slot = crateEmptySlot()
            slot.setAttribute('id', `${columnIndex}${rowIndex}`)
            board.appendChild(slot)
        })
    })
}

function setTitle(currentPlayer){
    titlePlayer.classList.remove('red', 'yellow')
    if (currentPlayer == 1){
        titlePlayer.innerText = 'Yellow'
        titlePlayer.classList.add('yellow')
    }
    else if(currentPlayer == 2){
        titlePlayer.innerText = 'Red'
        titlePlayer.classList.add('red')
    }
    
}

function gameMovement() {
    setTitle(currentPlayer)
}

document.addEventListener('DOMContentLoaded', () => {
    setGame()
    gameMovement()
})
