import { buildGameGrid } from "../../../../gameplay/buildGameGrid.js"

export async function beginGame(categoriesArray, socket, className, gameNameInput) {
    console.log("beginning game...")
    // console.log("categoriesArray: ",categoriesArray)
    const mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""

    const gameWindow = document.createElement("div")
    gameWindow.id = "gameWindow"

    const classNameHeader = document.createElement("div")
    classNameHeader.id = "classNameHeader"
    classNameHeader.innerText = className

    const gameHeader = document.createElement("div")
    gameHeader.id = "gameHeader"
    gameHeader.innerText = gameNameInput;

    const playerScoreSection = document.createElement("div")
    playerScoreSection.id = "playerScoreSection"


    gameWindow.append(classNameHeader, gameHeader)

    mainContent.append(gameWindow, playerScoreSection)
    buildGameGrid(categoriesArray, socket)
}