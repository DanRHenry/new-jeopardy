export async function buildChooseAClassSection() {
    const chooseAClassSection = document.createElement("div")
    chooseAClassSection.id = "chooseAClassSection"


    const title = document.createElement("div")
    title.innerText = "Choose a Class"

    const chooseAClassDropdown = document.createElement("selector")
    chooseAClassDropdown.id = "chooseAClassDropdown";

    // fetch existing classes and then add map over them, adding them:

//    const select = document.createElement("select")
    // select.name = "class-names"
    // select.className = "classNames"
    // select.id = "class-names"

    // chooseAClassDropdown.append(select)

    chooseAClassSection.append(title, chooseAClassDropdown)
    document.getElementById("mainContent").append(chooseAClassSection)
}