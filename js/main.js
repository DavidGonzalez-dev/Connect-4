//! Importation of the variables and constanst of the game
import { slotTypes } from "./config.js"

//! We import the functions for configuring the files
import { setGame, setNewBoardMap, playerMovement } from "./config.js"

//! Declaration of the Starter Player
let currentPlayer = slotTypes.yellow

//! Declaration of the dimensions of the board
const nColumns = 7
const nRows = 6
let boardMap = setNewBoardMap(nRows, nColumns)





//? Main Game Execution
document.addEventListener('DOMContentLoaded', () => {
    setGame(boardMap)
    playerMovement(currentPlayer)
    document.getElementById('restart-game').addEventListener('click', () => {
        setScores(slotTypes.red)
    })
})
