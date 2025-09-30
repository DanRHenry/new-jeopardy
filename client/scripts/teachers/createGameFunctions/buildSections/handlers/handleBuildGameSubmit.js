import { saveCategory } from "../../crud/saveCategory.js";
import { buildExistingQuestionsAndAnswersSection } from "../buildExistingQuestionsAndAnswersSection.js";
import { getAllCategories } from "../../crud/getAllCategories.js";
import {buildGameplayCategoriesSection} from "../buildGameplayCategoriesSection.js"

export async function handleBuildGameSubmit(gameArray) {
  const newCategorySection = document.getElementById(
    "assembleNewCategorySectionOL"
  );

  console.log("newCategorySection: ", newCategorySection);

  const children = newCategorySection.querySelectorAll("li");
  console.log(children);

  const categoryArray = [];
  for (let i = 0; i < children.length; i++) {
    const gameObject = {};

    const info = children[i].querySelectorAll("span");

    const className = info[0].innerText;
    const category = info[1].innerText;
    const prompt = info[2].innerText;
    const response = info[3].innerText;

    console.log(className, category, prompt, response);

    gameObject.className = className;
    gameObject.category = category;
    gameObject.prompt = prompt;
    gameObject.response = response;

    const newAvailableGameListing = document.createElement("div");
    newAvailableGameListing.className = "newAvailableGameListings";

    const newAvailableGameListingClassName = document.createElement("span");
    newAvailableGameListingClassName.innerText = className;

    const newAvailableGameListingCategory = document.createElement("span");
    newAvailableGameListingCategory.innerText = category;

    const newAvailableGameListingPrompt = document.createElement("span");
    newAvailableGameListingPrompt.innerText = prompt;

    const newAvailableGameListingResponse = document.createElement("span");
    newAvailableGameListingResponse.innerText = response;

    categoryArray.push(gameObject);
  }
  const newGame = {};
  if (
    document.getElementById("newClassNameInput").value &&
    document.getElementById("newCategoryNameInput").value
  ) {
    newGame.className = document.getElementById("newClassNameInput").value;
    newGame.categoryName = document.getElementById(
      "newCategoryNameInput"
    ).value;
    newGame.category = categoryArray;
    gameArray.push(newGame);
          console.log("newgame:",newGame)

    const newCategoryObject = {}

    newCategoryObject.className = newGame.className;
    newCategoryObject.email = sessionStorage.email;
    newCategoryObject.prompts = []
    newCategoryObject.responses = []
    newCategoryObject.category = newGame.categoryName;

    for (let i = 0; i < newGame.category.length; i++) {
      newCategoryObject.prompts.push(newGame.category[i].prompt)
      newCategoryObject.responses.push(newGame.category[i].response)
    }

    console.log("newCategoryObject: ",newCategoryObject)

    await saveCategory(newCategoryObject)

    // const availableCategoriesArray = []
    //     const existingCategories = await getAllCategories()
    
    //     for (let i = 0; i < existingCategories.length; i++) {
    //     availableCategoriesArray.push(existingCategories[i]);
    //     }
    
    document.getElementById("newClassAndCategorySection")?.remove()
document.getElementById("newBuildClassSubmitBtn")?.remove()

document.getElementById("gameplayCategoriesSection")?.remove()
document.getElementById('assembleNewCategorySectionOL').innerHTML = ""

const checkboxes = document.getElementsByClassName("existingQuestionCheckboxes")
for(let i = 0; i < checkboxes.length; i++){
  checkboxes[i].checked = false
}
// console.log("availableCategoriesArray: ",availableCategoriesArray)
// let availableCategoriesArray = []
    buildGameplayCategoriesSection([])

    // buildExistingQuestionsAndAnswersSection(gameArray)
    if (gameArray.length === 5) {
      console.log(gameArray, gameArray.length);
      console.log("full game, play now");
    }
    console.log(gameArray, gameArray.length);
  }
}
