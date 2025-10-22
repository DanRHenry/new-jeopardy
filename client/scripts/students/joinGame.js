import { createLogoutBtn } from "../login-signup/createLogoutBtn.js";

export function joinGame(studentWebsocket) {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";
  const joinGameSection = document.createElement("div")
  joinGameSection.id = "joinGameSection"


    const teacherList = document.createElement("select");
    teacherList.id = "teacherList";
    teacherList.name = "teacherList";

    const teacherListLabel = document.createElement("label");
    teacherListLabel.setAttribute("for", "teacherList");
    teacherListLabel.innerText = "Select Teacher";

    const teacherSelectLine = document.createElement("div");
    teacherSelectLine.id = "teacherSelectLine";
    teacherSelectLine.append(teacherListLabel, teacherList);

    joinGameSection.append(teacherSelectLine)
    mainContent.append(joinGameSection)
    createLogoutBtn(studentWebsocket)
  // console.log("joining game as a student");
}
