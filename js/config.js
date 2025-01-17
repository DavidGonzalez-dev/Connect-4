// This variable stores the slotTypes
export const slotTypes = {
    empty: 0,
    yellow: 1,
    red: 2
}

//This function stores the scores
export let score = { red: 0, yellow: 0 }

// This function initizalize the game variables
export function setGame(boardMap) {
    createBoard(boardMap)
    createSelectButtons(boardMap[1].length)
    setScores()
}

// This function initialize an empty board
export function setNewBoardMap(nRows, nColumns) {
    return Array.from(new Array(nRows), () => new Array(nColumns).fill(slotTypes.empty))
}

// This function changes the h1 of the title verifing the actual current player.
export function changePlayer(currentPlayer) {

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

const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" 
                            // viewBox="0 0 24 24" 
                            // fill="none" 
                            // stroke="currentColor" 
                            // stroke-linecap="round" 
                            // stroke-linejoin="round" 
                            // width="24" 
                            // height="24" 
                            // stroke-width="2"><path d="M15 12h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-3h6v3z"></path><path d="M15 3h-6"></path><path d="M15 6h-6"></path></svg>`


//! Declaration of the elements in the DOM
let board = document.getElementById('game-board')
let titlePlayer = document.getElementById('turn')
let selectButtons = document.getElementById('column-selector')
let yellowScore = document.getElementById('yellow-score')
let redScore = document.getElementById('red-score')


// This functions set scores it takes an optional winner argument
// Winner is an int value from 1-2 in order to identify the winner using the slotTypes object
function setScores(winner, scores) {

    if (winner) {
        scores[Object.keys(slotTypes).find(key => slotTypes[key] === winner)]++
    }

    yellowScore.innerText = score.yellow
    redScore.innerText = score.red
}



// This function changes the color of the select column Buttons
function updateColumnSelectButtons(buttons, color) {
    for (const button of buttons) {
        button.classList.remove('red-button', 'yellow-button')
        button.classList.add(color)
    }
}

// This function creates column select buttons as many number of columns are passed
function createSelectButtons(nColumns) {

    for (let button = 0; button < nColumns; button++) {
        let button = document.createElement("button")
        button.innerHTML = arrowIcon
        button.setAttribute('id', button + 1)
        selectButtons.appendChild(button)
    }

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

    createSelectButtons(boardMap[1].lenght)
}

// This function stores all the logic of a player movement
export function playerMovement(currentPlayer, boardMap) {
    changePlayer(currentPlayer)
}