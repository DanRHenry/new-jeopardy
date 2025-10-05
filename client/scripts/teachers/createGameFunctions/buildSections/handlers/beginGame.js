import { buildGameGrid } from "../../../../gameplay/buildGameGrid.js"

export async function beginGame(categoriesArray, socket) {
    console.log("beginning game...")
    // console.log("categoriesArray: ",categoriesArray)
    const mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""

    const gameWindow = document.createElement("div")
    gameWindow.id = "gameWindow"

    const playerScoreSection = document.createElement("div")
    playerScoreSection.id = "playerScoreSection"

    mainContent.append(gameWindow, playerScoreSection)
    buildGameGrid(categoriesArray, socket)
}