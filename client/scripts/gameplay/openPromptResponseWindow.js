import { handleBuzzIn } from "./handlers/handleBuzzIn.js"

export function openPromptResponseWindow(activePrompt, activeResponse, socket, activeCategory, score) {

    console.log("activePrompt:",activePrompt)
    // console.log("activeResponse: ",activeResponse)

    const backgroundOverlay = document.createElement("div")
    backgroundOverlay.id = "backgroundOverlay"
    backgroundOverlay.style.backgroundColor = "rgba(0,0,0,0)"
    backgroundOverlay.style.height = "100%";
    backgroundOverlay.style.width = "100%";

    const promptResponseWindow = document.createElement("div")
    promptResponseWindow.id = "promptResponseWindow"

    const promptCategory = document.createElement("div")
    promptCategory.id = "promptCategory"
    promptCategory.innerText = activeCategory;

    const promptText = document.createElement("div")
    promptText.id = "promptText"
    promptText.innerText = activePrompt

    const studentAnswering = document.createElement("div")
    studentAnswering.id = "studentAnswering"
    studentAnswering.innerText = ""

    const buzzInBtn = document.createElement("button")
    buzzInBtn.id = "buzzInBtn"
    buzzInBtn.innerText = "Buzz"
    buzzInBtn.addEventListener("click", () => {
        handleBuzzIn(activePrompt, activeResponse, socket, score)
    })


    if (!document.getElementById("backgroundOverlay")){

        promptResponseWindow.append(promptCategory, promptText, studentAnswering)

        if (sessionStorage.role === "student") {
            promptResponseWindow.append(buzzInBtn)
        }

        console.log("role: ",sessionStorage.role)


        if (sessionStorage.role == "teacher") {
        const showResponseBtn = document.createElement("button")
        showResponseBtn.innerText = "End and Show"
        showResponseBtn.addEventListener("click", showResponse)
        studentAnswering.after(showResponseBtn)
    }
        
        document.getElementById("gameWindow").append(backgroundOverlay, promptResponseWindow)
    }

    //!----------------------- Functions ----------------------

    function showResponse() {

            socket.send(JSON.stringify({"showResponse": "true", "activePrompt": activePrompt, "activeResponse": activeResponse}))
            document.getElementById("showResponseBtn").removeEventListener("click", showResponse)
        }
}