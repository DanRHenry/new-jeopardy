export async function buildTeacherLobby(className, categoriesArray) {
    const mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""

    const pendingGameWindow = document.createElement("div")
    pendingGameWindow.id = "pendingGameWindow";

    const studentListSection = document.createElement("div")
    studentListSection.id = "studentListSection"

    const studentEmailsHeader = document.createElement("div")
    studentEmailsHeader.id = "studentEmailsHeader"
    studentEmailsHeader.innerText = "Students"

    const studentEmailsList = document.createElement("div")
    studentEmailsList.id = "studentEmailsList"

    studentListSection.append(studentEmailsHeader, studentEmailsList)

    pendingGameWindow.append(studentListSection)

    mainContent.append(pendingGameWindow)

    const enableSoundsBtn = document.createElement("button")
    enableSoundsBtn.id = "enableSoundsBtn"
    enableSoundsBtn.innerText = "Enable Sounds"
    sessionStorage.playSound = "false"
    enableSoundsBtn.addEventListener("click", () => {
        if (enableSoundsBtn.innerText === "Disable Sounds") {
            sessionStorage.playSound = "false"
            enableSoundsBtn.innerText = "Enable Sounds"
        }
        else if (enableSoundsBtn.innerText === "Enable Sounds") {
            sessionStorage.playSound = "true"
            enableSoundsBtn.innerText = "Disable Sounds"
        }
    })

    document.getElementById("mainContent").before(enableSoundsBtn)
}