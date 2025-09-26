import { buildExistingQuestionsAndAnswersSection } from "./createGameFunctions/buildExistingQuestionsAndAnswersSection.js";
import { submitNewQuestionAndAnswer } from "./createGameFunctions/crud/submitNewQuestionAndAnswer.js";
import { buildAddNewCategorySection } from "./createGameFunctions/buildAddNewCategorySection.js";
import { buildChooseAClassSection } from "./createGameFunctions/buildChooseAClassSection.js";
import { buildGameplayCategoriesSection } from "./createGameFunctions/buildGameplayCategoriesSection.js";
import { buildAvailableGamesSection } from "./createGameFunctions/buildAvailableGamesSection.js";
import { buildAssembleNewCategorySection } from "./createGameFunctions/buildAssembleNewCategorySection.js";
import { openAndClose } from "./createGameFunctions/openAndClose.js";

export async function createGame() {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";

  const createGameContent = document.createElement("div");
  createGameContent.id = "createGameContent";

  console.log("creating game as a teacher");

  const newQuestionAndAnswerContainer = document.createElement("div");
  newQuestionAndAnswerContainer.id = "newQuestionAndAnswerContainer";

  function buildNewQuestionAndAnswerSection() {
    const newQuestionAndAnswerHeader = document.createElement("div");
    newQuestionAndAnswerHeader.innerText = "Create a new question";
    newQuestionAndAnswerHeader.id = "newQuestionAndAnswerHeader";
    newQuestionAndAnswerHeader.addEventListener("click", () => {
      console.log("click");
      openAndClose("newQuestionAndAnswerContainer","2rem");
    });

    const questionAndAnswerInputForm = document.createElement("form");
    questionAndAnswerInputForm.id = "questionAndAnswerInputForm";
    questionAndAnswerInputForm.onsubmit = async function (e) {
      e.preventDefault();
      await submitNewQuestionAndAnswer(
        this.defaultCategoryInput.value,
        this.defaultClassInput.value,
        this.answerInput.value,
        this.questionInput.value,
        sessionStorage.email
      );
    };

    const answerInput = document.createElement("input");
    answerInput.id = "answerInput";
    answerInput.name = "answerInput";
    answerInput.placeholder = "Enter prompt";
    answerInput.required = true;

    const questionInput = document.createElement("input");
    questionInput.id = "questionInput";
    questionInput.name = "questionInput";
    questionInput.placeholder = "Enter response";
    questionInput.required = true;

    const defaultClassInput = document.createElement("input");
    defaultClassInput.id = "defaultClassInput";
    defaultClassInput.name = "defaultClassInput";
    defaultClassInput.placeholder = "Default Class";

    const defaultCategoryInput = document.createElement("input");
    defaultCategoryInput.id = "defaultCategoryInput";
    defaultCategoryInput.name = "defaultCategoryInput";
    defaultCategoryInput.placeholder = "Default Category";

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit";

    questionAndAnswerInputForm.append(defaultClassInput, defaultCategoryInput);

    newQuestionAndAnswerContainer.append(
      newQuestionAndAnswerHeader,
      questionAndAnswerInputForm,
      answerInput,
      questionInput,
      submitBtn
    );

    createGameContent.append(newQuestionAndAnswerContainer);

    const createGameContentSection = document.createElement("div")
    createGameContentSection.id = "createGameContentSection"
    mainContent.append(createGameContentSection);
    createGameContentSection.append(createGameContent)
    const existingGames = document.createElement("div");
    existingGames.id = "existingGames";
    existingGames.innerText = "Existing Games";
  }

  buildNewQuestionAndAnswerSection();

  buildExistingQuestionsAndAnswersSection();

  buildAddNewCategorySection();

  // buildChooseAClassSection()

  buildGameplayCategoriesSection();

  buildAvailableGamesSection();

  buildAssembleNewCategorySection();
}
