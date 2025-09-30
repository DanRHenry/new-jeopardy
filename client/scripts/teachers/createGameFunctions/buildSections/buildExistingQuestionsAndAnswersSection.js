import { getAllExistingQuestionsAndAnswers } from "../crud/getAllExistingQuestionsAndAnswers.js";

import { handleBuildGameSubmit } from "./handlers/handleBuildGameSubmit.js";



export async function buildExistingQuestionsAndAnswersSection(gameArray) {
  gameArray = []
  const existingQuestionsAndAnswersSection = document.createElement("div");
  existingQuestionsAndAnswersSection.id = "existingQuestionsAndAnswersSection";

  const existingQuestionsAndAnswersContainer = document.createElement("div")
        existingQuestionsAndAnswersContainer.id = "existingQuestionsAndAnswersContainer"

  existingQuestionsAndAnswersSection.append(existingQuestionsAndAnswersContainer)

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

  existingQuestionsAndAnswersContainer.append(headers);

  //! Headers Section Done

  const existingQuestionsAndAnswers = await getAllExistingQuestionsAndAnswers();

  const existingCategories = new Set(
    existingQuestionsAndAnswers.map((item) => item.defaultCategory).sort()
  );

  //! Existing Questions & Answers section

  existingCategories.forEach((category) => {
    // const categoryHolder = document.createElement("div");
    // categoryHolder.className = "categoryHolder";
    // categoryHolder.style.height = "1rem";

    const categoryHolderHeadings = document.createElement("div");

    // const listingClass = document.createElement("div");
    // listingClass.innerText = "Class Name Here";

    const listingCategory = document.createElement("div");
    listingCategory.innerText = category;
    categoryHolderHeadings.append(listingCategory);
    categoryHolderHeadings.classList.add("categoryHolderHeadings");
    // categoryHolder.append(categoryHolderHeadings);
    existingQuestionsAndAnswersContainer.append(categoryHolderHeadings)

    // console.log(existingQuestionsAndAnswers);
    for (let j = 0; j < existingQuestionsAndAnswers.length; j++) {
      if (existingQuestionsAndAnswers[j].defaultCategory === category) {
        const newQuestionHeader = document.createElement("div");
        newQuestionHeader.id = "newQuestionHeader";

        const newQuestionHeaderContent = document.createElement("div");
        newQuestionHeaderContent.id = "newQuestionHeaderContent";
        newQuestionHeaderContent.innerText = "Create a New Question";

        newQuestionHeader.append(newQuestionHeaderContent);

        const categoryListing = document.createElement("div");
        categoryListing.className = "categoryListings";
        // categoryHolderHeadings.style.visibility = "hidden";

        const listingClass = document.createElement("div");
        listingClass.innerText = truncatedEntry(
          existingQuestionsAndAnswers[j].defaultClass
        );

        const listingCategory = document.createElement("div");
        listingCategory.innerText = truncatedEntry(
          existingQuestionsAndAnswers[j].defaultCategory
        );

        const listingAnswer = document.createElement("div");
        listingAnswer.innerText = truncatedEntry(
          existingQuestionsAndAnswers[j].answer
        );

        const listingQuestion = document.createElement("div");
        listingQuestion.innerText = truncatedEntry(
          existingQuestionsAndAnswers[j].question
        );

        const checkbox = document.createElement("input");
        checkbox.className = "existingQuestionCheckboxes";
        checkbox.type = "checkbox";
        checkbox.name = `existingQuestionsCheckbox_${j}`
        checkbox.id = `existingQuestionsCheckbox_${j}`
        checkbox.addEventListener("click", () =>
          handleCheckboxClick(existingQuestionsAndAnswers[j], checkbox, j)
        );

        // () => {

        // });

        categoryListing.append(
          listingClass,
          listingCategory,
          listingQuestion,
          listingAnswer,
          checkbox
        );

        // categoryHolder.append(categoryListing);

        existingQuestionsAndAnswersContainer.append(categoryListing)
      }
    }
    // existingQuestionsAndAnswersSection.append(categoryHolder);
  });

  document.getElementById("mainContent").append(existingQuestionsAndAnswersSection);
  const categoryHolders = document.getElementsByClassName("categoryHolder");

  for (let i = 0; i < categoryHolders.length; i++) {
    const header = categoryHolders[i].firstChild;
    header.style.overflowY = "hidden";

    // header.addEventListener("click", () => {
    //   if (categoryHolders[i].style.height === "fit-content") {
    //     categoryHolders[i].style.height = null;
    //   } else {
    //     categoryHolders[i].style.height = "fit-content";
    //   }
    // });
  }
  function truncatedEntry(text) {
    const ellipsis = `...`;
    if (text.length > 7) {
      let output = text.slice(0, 7);

      output += ellipsis;

      return output;
    } else {
      return text;
    }
  }

  function handleCheckboxClick(item, checkbox, id) {
    const assembleNewCategorySectionOL = document.getElementById(
      "assembleNewCategorySectionOL"
    );

    const listing = document.createElement("li");
    listing.id = `newCategoryListing_${id}`;

    const className = document.createElement("span");
    className.innerText = item.defaultClass;
    const cat = document.createElement("span");
    cat.innerText = item.defaultCategory;
    const prompt = document.createElement("span");
    prompt.innerText = item.question;
    const response = document.createElement("span");
    response.innerText = item.answer;

    listing.append(className, cat, prompt, response);
    listing.addEventListener("click", () => {
      const confirmDelete = confirm("Would you like to remove the question?");
      if (confirmDelete) {
        // console.log("removing listing");
        listing.remove();
      }
    });

    if (checkbox.checked) {
      assembleNewCategorySectionOL.append(listing);
    } else {
      document.getElementById(`newCategoryListing_${id}`).remove();
    }

    // console.log("assembleNewCategorySectionOL: ", assembleNewCategorySectionOL);

    const listItems = assembleNewCategorySectionOL.children;

    if (listItems.length === 5) {
      const classNameInputLabel = document.createElement("div");
      classNameInputLabel.setAttribute("for", "newClassNameInput");
      classNameInputLabel.id = "classNameInputLabel";
      classNameInputLabel.innerText = "Class Name:";

      const newClassNameInput = document.createElement("input");
      newClassNameInput.id = "newClassNameInput";
      newClassNameInput.name = "newClassNameInput";
      classNameInputLabel.append(newClassNameInput);

      const newCategoryNameInput = document.createElement("input");
      newCategoryNameInput.label = "newCategoryNameInput";
      newCategoryNameInput.id = "newCategoryNameInput";
      // newCategoryNameInput.addEventListener("change", () => {
        // document.getElementById("assembleNewCategorySectionHeader").innerText =
          // newCategoryNameInput.value;
      // });

      const categoryNameInputLabel = document.createElement("div");
      categoryNameInputLabel.innerText = "Category Name";
      categoryNameInputLabel.id = "categoryNameInputLabel"

      categoryNameInputLabel.append(newCategoryNameInput);

      const submitBtn = document.createElement("button");
      submitBtn.id = "newBuildClassSubmitBtn"
      submitBtn.innerText = "Submit";
      submitBtn.addEventListener("click", () => {
        handleBuildGameSubmit(gameArray)
      }
      );

      const newClassAndCategorySection = document.createElement("div");
      newClassAndCategorySection.id = "newClassAndCategorySection";

      newClassAndCategorySection.append(
        classNameInputLabel,
        categoryNameInputLabel
      );
      assembleNewCategorySectionOL.before(newClassAndCategorySection);
      assembleNewCategorySectionOL.after(submitBtn);
    } else {
      document.getElementById("newClassNameInput")?.remove()
      document.getElementById("classNameInputLabel")?.remove()
      document.getElementById("newCategoryNameInput")?.remove()
      document.getElementById("categoryNameInputLabel")?.remove()
      document.getElementById("newBuildClassSubmitBtn")?.remove()

    }
  }
}
