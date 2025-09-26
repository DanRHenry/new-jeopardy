import { getAllExistingQuestionsAndAnswers } from "./crud/getAllExistingQuestionsAndAnswers.js";
import { handleQuestionCheckboxClick } from "./checkboxFunctions/handleQuestionCheckboxClick.js";
import { openAndClose } from "./openAndClose.js";
import { buildQuestionListingScreen } from "../buildQuestionListingScreen.js";

export async function buildExistingQuestionsAndAnswersSection() {
  const existingQuestionsAndAnswersSection = document.createElement("div");
  existingQuestionsAndAnswersSection.id = "existingQuestionsAndAnswersSection";

  const headers = document.createElement("div");
  headers.id = "createNewQuestionAndAnswerHeaders";

  const classInputHeader = document.createElement("div");
  classInputHeader.id = "classInputHeader";
  classInputHeader.innerText = "Class";

  const categoryInputHeader = document.createElement("div");
  categoryInputHeader.id = "categoryInputHeader";
  categoryInputHeader.innerText = "Category";

  const responseInputHeader = document.createElement("div");
  responseInputHeader.id = "responseInputHeader";
  responseInputHeader.innerText = "Response";

  const promptInputHeader = document.createElement("div");
  promptInputHeader.id = "promptInputHeader";
  promptInputHeader.innerText = "Prompt";

  const checkboxHeader = document.createElement("span");
  checkboxHeader.id = "checkboxHeader";
  checkboxHeader.innerText = "Check";

  headers.append(
    classInputHeader,
    categoryInputHeader,
    promptInputHeader,
    responseInputHeader,
    checkboxHeader
  );

  existingQuestionsAndAnswersSection.append(headers);

  //! Headers Section Done

  const existingQuestionsAndAnswers = await getAllExistingQuestionsAndAnswers();

  const existingCategories = new Set(
    existingQuestionsAndAnswers.map((item) => item.defaultCategory).sort()
  );

  //! Existing Questions & Answers section

  existingCategories.forEach((category) => {
    const categoryHolder = document.createElement("div");
    categoryHolder.className = "categoryHolder";
    // categoryHolder.style.height = "1rem";

    const listingContainer = document.createElement("div");
    listingContainer.classList.add("listingContainerHeaders");

    const listingClass = document.createElement("div");

    const listingCategory = document.createElement("div");
    listingCategory.innerText = category;
    listingContainer.append(listingClass, listingCategory);
    listingContainer.classList.add("categoryHolderHeadings");
    categoryHolder.append(listingContainer);

    console.log(existingQuestionsAndAnswers);
    for (let j = 0; j < existingQuestionsAndAnswers.length; j++) {
      if (existingQuestionsAndAnswers[j].defaultCategory === category) {
        const newQuestionHeader = document.createElement("div");
        newQuestionHeader.id = "newQuestionHeader";

        const newQuestionHeaderContent = document.createElement("div");
        newQuestionHeaderContent.id = "newQuestionHeaderContent";
        newQuestionHeaderContent.innerText = "Create a New Question";

        newQuestionHeader.append(newQuestionHeaderContent);

        const listingContainer = document.createElement("div");
        listingContainer.className = "listingContainer";
        // listingContainer.style.visibility = "hidden";

        const listingClass = document.createElement("div");
        listingClass.innerText = existingQuestionsAndAnswers[j].defaultClass;

        const listingCategory = document.createElement("div");
        listingCategory.innerText =
          existingQuestionsAndAnswers[j].defaultCategory;

        const listingAnswer = document.createElement("div");
        listingAnswer.innerText = existingQuestionsAndAnswers[j].answer;

        const listingQuestion = document.createElement("div");
        listingQuestion.innerText = existingQuestionsAndAnswers[j].question;

        const checkbox = document.createElement("input");
        checkbox.className = "existingQuestionCheckbox";
        checkbox.type = "checkbox";
        checkbox.addEventListener("click", () => {
          handleQuestionCheckboxClick(
            existingQuestionsAndAnswers[j],
            checkbox.checked
          );
        });

        listingContainer.append(
          listingClass,
          listingCategory,
          listingQuestion,
          listingAnswer,
          checkbox
        );

        categoryHolder.append(listingContainer);
      }
    }
    existingQuestionsAndAnswersSection.append(categoryHolder);
  });

  mainContent.append(existingQuestionsAndAnswersSection);
  const categoryHolders = document.getElementsByClassName("categoryHolder");

  for (let i = 0; i < categoryHolders.length; i++) {
    const header = categoryHolders[i].firstChild;
    header.style.overflowY = "hidden";

    header.addEventListener("click", () => {
      if (categoryHolders[i].style.height === "fit-content") {
        categoryHolders[i].style.height = null;
      } else {
        categoryHolders[i].style.height = "fit-content";
      }
    });
  }
}
