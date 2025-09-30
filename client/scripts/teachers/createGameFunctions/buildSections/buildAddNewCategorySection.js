import { openAndClose } from "../generalPageControlFunctions/openAndClose.js";

export async function buildAddNewCategorySection() {
  const addNewCategorySection = document.createElement("div");
  addNewCategorySection.id = "addNewCategorySection";


  const addNewCategorySectionHeader = document.createElement("div")
  addNewCategorySectionHeader.innerText = "Create a New Category"
  addNewCategorySectionHeader.id = "addNewCategorySectionHeader"
    addNewCategorySectionHeader.addEventListener("click", () => {
    openAndClose("addNewCategorySection", "3rem")
  })


  const classNameLabel = document.createElement("div");
  classNameLabel.setAttribute("for", "classNameInput");
  classNameLabel.innerText = "Class Name:";
  classNameLabel.id = "classNameLabel"


  const classNameInput = document.createElement("input");
  classNameInput.id = "classNameInput";
  classNameInput.name = "classNameInput";

  const classNameAndLabel = document.createElement("div")
  classNameAndLabel.id = "classNameAndLabel"
  classNameAndLabel.append(classNameLabel, classNameInput)


  const unitNameLabel = document.createElement("div");
  unitNameLabel.setAttribute("for", "unitNameInput");
  unitNameLabel.innerText = "Unit Name:";

  const unitNameInput = document.createElement("input");
  unitNameInput.id = "unitNameInput";
  unitNameInput.name = "unitNameInput";

  const unitNameAndLabel = document.createElement("div")
  unitNameAndLabel.id = "unitNameAndLabel"
  unitNameAndLabel.append(unitNameLabel, unitNameInput)

  const categoryLabel = document.createElement("div");
  categoryLabel.setAttribute("for", "categoryInput");
  categoryLabel.innerText = "Category:";

  const categoryInput = document.createElement("input");
  categoryInput.id = "categoryInput";
  categoryInput.name = "categoryInput";

  const promptsTextBoxLabel = document.createElement("div");
  promptsTextBoxLabel.setAttribute("for", "promptsTextBoxInput");
  promptsTextBoxLabel.innerText = "Prompts";

  const promptsTextBoxInput = document.createElement("textArea");
  promptsTextBoxInput.id = "promptsTextBoxInput";
  promptsTextBoxInput.name = "promptsTextBoxInput";

  const responsesTextBoxLabel = document.createElement("div");
  responsesTextBoxLabel.setAttribute("for", "responsesTextBoxInput");
  responsesTextBoxLabel.innerText = "Responses";

  const responsesTextBoxInput = document.createElement("textArea");
  responsesTextBoxInput.id = "responsesTextBoxInput";
  responsesTextBoxInput.name = "responsesTextBoxInput";

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.addEventListener("click", () => {
    console.log("clicked submit");
  });

const classAndUnitLine = document.createElement("div")
classAndUnitLine.id = "classAndUnitLine"


classAndUnitLine.append(classNameAndLabel, unitNameAndLabel)

  addNewCategorySection.append(
    addNewCategorySectionHeader,
    classAndUnitLine,
    categoryLabel,
    categoryInput,
    promptsTextBoxLabel,
    promptsTextBoxInput,
    responsesTextBoxLabel,
    responsesTextBoxInput,
    submitBtn
  );

  document.getElementById("createGameContent").append(addNewCategorySection);
}
