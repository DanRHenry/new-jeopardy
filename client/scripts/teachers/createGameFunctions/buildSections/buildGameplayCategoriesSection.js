import { serverURL } from "../../../serverURL.js";
import { getAllCategories } from "../crud/getAllCategories.js";
import { saveNewGame } from "../crud/saveNewGame.js";
import { addCategoriesToGame } from "./handlers/addCategoriesToGame.js";

export async function buildGameplayCategoriesSection(availableCategoriesArray) {
  availableCategoriesArray = [];
  const gameplayCategoriesSection = document.createElement("div");
  gameplayCategoriesSection.id = "gameplayCategoriesSection";

  const gameplayCategoriesSectionHeader = document.createElement("div");
  gameplayCategoriesSectionHeader.id = "gameplayCategoriesSectionHeader";
  gameplayCategoriesSectionHeader.innerText = "Available Categories";

  const categoryHeadersRow = document.createElement("div");
  categoryHeadersRow.id = "categoryHeadersRow";


  const selectHeader = document.createElement("span")
  selectHeader.innerText = "Select"

  const classHeader = document.createElement("span");
  classHeader.innerText = "Class";

  const categoryNameHeader = document.createElement("span");
  categoryNameHeader.innerText = "Category";

  const promptsHeader = document.createElement("span");
  promptsHeader.innerText = "Prompts";

  const responsesHeader = document.createElement("span");
  responsesHeader.innerText = "Responses";

  categoryHeadersRow.append(
    selectHeader,
    classHeader,
    categoryNameHeader,
    promptsHeader,
    responsesHeader
  );

  gameplayCategoriesSection.append(
    gameplayCategoriesSectionHeader,
    categoryHeadersRow
  );
  document.getElementById("mainContent").append(gameplayCategoriesSection);

  const existingCategories = await getAllCategories();

  for (let i = 0; i < existingCategories.length; i++) {
    availableCategoriesArray.push(existingCategories[i]);
  }

//   console.log("availableCategoriesArray: ", availableCategoriesArray);

  const newGameArray = [];

  for (let i = 0; i < availableCategoriesArray.length; i++) {
    const row = document.createElement("div");
    row.className = "availableCategoriesRows";
    const addToGame = document.createElement("input");
    addToGame.type = "checkbox";
    addToGame.className = "addCategoriesToGameCheckboxes";

    addToGame.addEventListener("click", () => {
      if (addToGame.checked) {
        newGameArray.push(availableCategoriesArray[i]);
      }

      if (!addToGame.checked) {
        newGameArray.splice(
          newGameArray.indexOf(availableCategoriesArray[i]),
          1
        );
      }

      if (newGameArray.length !== 5) {
        document
          .getElementById("addCategoriesToGameCheckboxesButton")
          ?.remove();
        document.getElementById("catAndClassRow")?.remove();
      }

      if (newGameArray.length === 5) {
        const addCategoriesToGameBtn = document.createElement("button");

        addCategoriesToGameBtn.id = "addCategoriesToGameCheckboxesButton";
        addCategoriesToGameBtn.innerText = "Add to Games List";

        const addCategoriesToGameGameNameField =
          document.createElement("input");
        addCategoriesToGameGameNameField.id =
          "addCategoriesToGameGameNameField";
        addCategoriesToGameGameNameField.placeholder = "New Game Name";
        addCategoriesToGameGameNameField.required = "true"

        const addCategoriesToGameClassField = document.createElement("input");
        addCategoriesToGameClassField.id = "addCategoriesToGameClassField";
        addCategoriesToGameClassField.placeholder = "Enter Class Name";
        addCategoriesToGameClassField.required = "true"

        const catAndClassRow = document.createElement("div");
        catAndClassRow.id = "catAndClassRow";

        catAndClassRow.append(
          addCategoriesToGameGameNameField,
          addCategoriesToGameClassField
        );

        addCategoriesToGameBtn.addEventListener("click", async () => {
          if (await saveNewGame(addCategoriesToGameGameNameField.value, addCategoriesToGameClassField.value, sessionStorage.email, newGameArray) === "existing game") {
            console.log("existing game")
            return
          } else {
            // console.log(saveNewGame(addCategoriesToGameGameNameField.value, addCategoriesToGameClassField.value, sessionStorage.email, newGameArray))
            // console.log("here")
            addCategoriesToGame(newGameArray, addCategoriesToGameClassField.value, addCategoriesToGameGameNameField.value);
          }
        });

        gameplayCategoriesSection.append(
          catAndClassRow,
          addCategoriesToGameBtn
        );
      }
    });

    const className = document.createElement("span");
    className.innerText = availableCategoriesArray[i].className;

    const category = document.createElement("span");
    category.innerText = availableCategoriesArray[i].category;

    const promptsInput = document.createElement("select");
    promptsInput.setAttribute("list", "gameplayCategoriesPrompts");
    promptsInput.name = `gameplayCategoriesPrompts_${i}`;

    const responsesInput = document.createElement("select");
    responsesInput.setAttribute("list", "gameplayCategoriesResponses");
    responsesInput.name = `gameplayCategoriesResponses${i}`;

    const promptsData = document.createElement("select");
    promptsData.id = `gameplayCategoriesPrompts_${i}`;
    promptsData.name = `gameplayCategoriesPrompts_${i}`;
    promptsData.className = `gameplayCategoriesPrompts`;

    const responsesData = document.createElement("select");
    responsesData.id = `gameplayCategoriesResponses_${i}`;
    responsesData.name = `gameplayCategoriesResponses_${i}`;
    responsesData.className = `gameplayCategoriesResponses`;

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
    // console.log(prompts)
    // console.log(responses)

    const deleteCategory = document.createElement("input");
    deleteCategory.type = "checkbox";
    deleteCategory.addEventListener("click", () => {
      if (deleteCategory.checked) {
        console.log("checked");
      } else {
        console.log("unchecked");
      }
    });

    row.append(addToGame, className, category, promptsData, responsesData);
    gameplayCategoriesSection.append(row);
  }
}
