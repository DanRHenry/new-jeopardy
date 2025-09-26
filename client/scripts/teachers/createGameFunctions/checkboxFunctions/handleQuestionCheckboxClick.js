export async function handleQuestionCheckboxClick (item, status) {
    if (status === true) {
    console.log(item)

    const assembleNewCategorySectionOL = document.getElementById("assembleNewCategorySectionOL")

    const listing = document.createElement("li")

    const className = document.createElement("span")
        className.innerText = item.defaultClass
    const cat = document.createElement("span")
        cat.innerText = item.defaultCategory
    const prompt = document.createElement("span")
        prompt.innerText = item.question
    const response = document.createElement("span")
        response.innerText = item.answer


    listing.append(className, cat, prompt, response)
    listing.addEventListener("click", () => {
        const confirmDelete = confirm("Would you like to remove the question?")
        console.log('clicked listing')
        console.log(item)

        if (!item.checked) {
            // item.remove()
        }
        
    })


    assembleNewCategorySectionOL.append(listing)

    console.log("assembleNewCategorySectionOL: ",assembleNewCategorySectionOL)

    const listItems = assembleNewCategorySectionOL.children;

    if (listItems.length === 5) {

        const categoryNameInput = document.createElement("input")
        categoryNameInput.label = "categoryNameInput"
        categoryNameInput.id = "categoryNameInput"

        const categoryNameInputLabel = document.createElement("div")
        categoryNameInputLabel.innerText = "Category Name"

        categoryNameInputLabel.append(categoryNameInput)

        const submitBtn = document.createElement("button")
        submitBtn.innerText = "Submit"
        submitBtn.addEventListener("click", () => {
            console.log("submitting questions for new category")
        })

        assembleNewCategorySectionOL.after(categoryNameInputLabel, submitBtn)
    }    // console.log("listItems: ",listItems.length)

    // console.log("listItems: ",listItems.length)
    // for (let i = 0; i < )

} else {
        console.log("remove item")
    }

}