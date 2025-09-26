export function buildAssembleNewCategorySection() {
  /* 
    A window that holds clicked questions until full (5 or 6? questions). 
    Contains a submit button that shows up once filled
    */
  const assembleNewCategorySection = document.createElement("div");
  assembleNewCategorySection.id = "assembleNewCategorySection";

  const assembleNewCategorySectionHeader = document.createElement("div");
  assembleNewCategorySectionHeader.id = "assembleNewCategorySectionHeader";
  assembleNewCategorySectionHeader.innerText = "New Category";

  const assembleNewCategorySectionOL = document.createElement("ol");
  assembleNewCategorySectionOL.id = "assembleNewCategorySectionOL";

  //   assembleNewCategorySection.append(assembleNewCategorySectionOL);
  assembleNewCategorySection.append(
    assembleNewCategorySectionHeader,
    assembleNewCategorySectionOL
  );

  document.getElementById("mainContent").append(assembleNewCategorySection);
}
