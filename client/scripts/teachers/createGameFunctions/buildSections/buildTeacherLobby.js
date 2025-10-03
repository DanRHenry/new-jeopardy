export async function buildTeacherLobby() {
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
}