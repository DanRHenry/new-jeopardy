export function buildQuestionListingScreen () {
    const body = document.querySelector("body")
    const questionListingWindow = document.createElement("div")
    questionListingWindow.id = "questionListingWindow"
    setTimeout(() => {
        questionListingWindow.style.opacity = 1
    }, 100);

    // const 
    /* 
    functionality:
        Edit the information;
        Add to a new category
        List available categories
        Delete Entry

    */
        const displaySection = document.createElement("div")
        displaySection.id = "displayQuestionAndAnswerSection"

        // const 


    body.append(questionListingWindow)
}