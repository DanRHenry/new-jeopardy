import { openPromptResponseWindow } from "../openPromptResponseWindow.js";

export function handleClickedSquare(data, socket) {
            const square = document.getElementById(data.squareClicked.gameSquare)
            const activePrompt = data.squareClicked.activePrompt;
            const activeResponse = data.squareClicked.activeResponse;
            const activeCategory = data.squareClicked.activeCategory

            console.log(data.squareClicked)
        // square.style.backgroundColor =
        //   "red";
          square.innerText = ""

          openPromptResponseWindow(activePrompt, activeResponse, socket, activeCategory)

          console.log("data: ",data)
}