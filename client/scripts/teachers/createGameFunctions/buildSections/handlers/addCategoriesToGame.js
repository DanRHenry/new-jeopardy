import { startGame } from "./startGame.js";
export async function addCategoriesToGame(
  availableCategoriesArray,
  classNameInput,
  gameNameInput
) {
  if (!availableCategoriesArray || !classNameInput || !gameNameInput) {
    alert("missing field");
    return;
  }
    const availableGamesTitleRow = document.createElement("div");
    availableGamesTitleRow.className = "availableGamesTitleRows";
    availableGamesTitleRow.classList.add("gameTitles"); 

  for (let i = 0; i < availableCategoriesArray.length; i++) {
    const row = document.createElement("div");
    row.className = "availableGameRows";

    const promptsInput = document.createElement("select");
    promptsInput.setAttribute("list", "availableGamesPrompts");
    promptsInput.name = `availableGamesPrompts_${i}`;

    const responsesInput = document.createElement("select");
    responsesInput.setAttribute("list", "availableGamesResponses");
    responsesInput.name = `availableGamesResponses${i}`;

    const promptsData = document.createElement("select");
    promptsData.id = `availableGamesPrompts_${i}`;
    promptsData.name = `availableGamesPrompts_${i}`;
    promptsData.className = `availableGamesPrompts`;

    const responsesData = document.createElement("select");
    responsesData.id = `availableGamesResponses_${i}`;
    responsesData.name = `availableGamesResponses_${i}`;
    responsesData.className = `availableGamesResponses`;

    for (let j = 0; j < availableCategoriesArray[i].prompts.length; j++) {
      const option = document.createElement("option");
      option.value = availableCategoriesArray[i].prompts[j];
      option.innerText = availableCategoriesArray[i].prompts[j];
      promptsData.append(option);
    }

    for (let j = 0; j < availableCategoriesArray[i].responses.length; j++) {
      const option = document.createElement("option");
      option.value = availableCategoriesArray[i].responses[j];
      option.innerText = availableCategoriesArray[i].responses[j];
      responsesData.append(option);
    }

    const deleteCategory = document.createElement("input");
    deleteCategory.type = "checkbox";
    deleteCategory.addEventListener("click", () => {
      if (deleteCategory.checked) {
        console.log("checked");
      } else {
        console.log("unchecked");
      }
    });

    row.append(promptsData, responsesData);
}

    const className = document.createElement("span");
    className.innerText = classNameInput;

    const gameName = document.createElement("span");
    gameName.innerText = gameNameInput;

    // console.log(gameNameInput)

const startGameBtn = document.createElement("button");
startGameBtn.id = "startGameBtn";
startGameBtn.innerText = "Start This Game";
startGameBtn.addEventListener("click", () => {
  // console.log("starting game with...");
  // console.log("questions & answers: ", availableCategoriesArray);

  // console.log("className: ",className)
  startGame(className.innerText, sessionStorage.email,availableCategoriesArray, gameNameInput)
});
availableGamesTitleRow.append(className, gameName, startGameBtn);
document
  .getElementById("availableGamesSection")
  .append(availableGamesTitleRow);
}
