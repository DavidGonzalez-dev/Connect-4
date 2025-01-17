const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" 
                            // viewBox="0 0 24 24" 
                            // fill="none" 
                            // stroke="currentColor" 
                            // stroke-linecap="round" 
                            // stroke-linejoin="round" 
                            // width="24" 
                            // height="24" 
                            // stroke-width="2"><path d="M15 12h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-3h6v3z"></path><path d="M15 3h-6"></path><path d="M15 6h-6"></path></svg>`


//! Declaration of the dimensions of the board
const nColumns = 7
const nRows = 6

//! Declaration of the elements in the DOM
let board = document.getElementById('game-board')
let titlePlayer = document.getElementById('turn')
let selectButtons = document.getElementById('column-selector')
let yellowScore = document.getElementById('yellow-score')
let redScore = document.getElementById('red-score')


//! Declaration of the types of slots
const slotTypes = {
    empty: 0,
    yellow: 1,
    red: 2
}


//* Declares of the game variables
let boardMap
let score = { red: 0, yellow: 0 }
let currentPlayer

// This functions set scores it takes an optional winner argument
// Winner is an int value from 1-2 in order to identify the winner using the slotTypes object
function setScores(winner){
    
    if (winner){
        score[Object.keys(slotTypes).find(key => slotTypes[key] === winner)]++
    }

    yellowScore.innerText = score.yellow
    redScore.innerText = score.red

}


// This function initizalize the game variables
function setGame() {
    boardMap = Array.from(new Array(nRows), () => new Array(nColumns).fill(slotTypes.empty))
    currentPlayer = slotTypes.yellow
    createBoard(boardMap)
    setScores()
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

//This function create a Column Select Button
function createColumnSelectButtton() {
    let button = document.createElement("button")
    button.innerHTML = arrowIcon
    return button
}

function createSelectButtons(nColumns) {

    for (let button = 0; button < nColumns; button++) {
        let selectButton = createColumnSelectButtton()
        selectButton.setAttribute('id', button + 1)
        selectButtons.appendChild(selectButton)
    }

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

    createSelectButtons(nColumns)
}

function updateColumnSelectButtons(buttons, color) {
    for (const button of buttons) {
        button.classList.remove('red-button', 'yellow-button')
        button.classList.add(color)
    }
}

// This function changes the h1 of the title verifing the actual current player.
function changePlayer(currentPlayer) {

    titlePlayer.classList.remove('red', 'yellow')
    let playerButtons = selectButtons.childNodes

    if (currentPlayer == slotTypes.yellow) {
        titlePlayer.innerText = 'Yellow'
        titlePlayer.classList.add('yellow')
        updateColumnSelectButtons(playerButtons, 'yellow-button')

    }
    else if (currentPlayer == slotTypes.red) {
        titlePlayer.innerText = 'Red'
        titlePlayer.classList.add('red')
        updateColumnSelectButtons(playerButtons, 'red-button')
    }


}

//This function stores all the logic of a plater movement
function plaverMovement(currentPlayer) {
    changePlayer(currentPlayer)
}


document.addEventListener('DOMContentLoaded', () => {
    setGame()
    changePlayer(currentPlayer)
    document.getElementById('restart-game').addEventListener('click', () => {
        setScores(slotTypes.red)
    })
})
