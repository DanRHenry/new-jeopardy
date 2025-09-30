import { getAllGames } from "../crud/getAllGames.js"
import { addCategoriesToGame } from "./handlers/addCategoriesToGame.js"


export async function buildAvailableGamesSection() {
    try {
    const availableGamesSection = document.createElement("div")
    availableGamesSection.id = "availableGamesSection"

    const availableGamesSectionHeader = document.createElement("div")
    availableGamesSectionHeader.id = "availableGamesSectionHeader"
    availableGamesSectionHeader.innerText = "Available Games:"


    availableGamesSection.append(availableGamesSectionHeader)

    document.getElementById("mainContent").append(availableGamesSection)

    const allGames = await getAllGames()

    console.log("all games: ",allGames.games)

    for (let i = 0; i < await allGames.games.length; i++) {
        const className = allGames.games[i].className
        const gameName = allGames.games[i].gameName
        const promptsAndResponses = allGames.games[i].promptsAndResponses

        addCategoriesToGame(
            promptsAndResponses,
            className,
            gameName
        )
//     addCategoriesToGame(availableCategoriesArray,
//   classNameInput,
//   gameNameInput)

      }

    } catch (err) {
        console.error(err)
    }

}