import { createLogoutBtn } from "../login-signup/createLogoutBtn.js";

export function joinGame(studentWebsocket) {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";
  const joinGameSection = document.createElement("div");
  joinGameSection.id = "joinGameSection";

  const teacherList = document.createElement("select");
  teacherList.id = "teacherList";
  teacherList.name = "teacherList";

  teacherList.addEventListener("change", handleTeacherListSelectionChange);

  const placeholderOption = document.createElement("option");
  placeholderOption.id = "placeholderOption";
  placeholderOption.innerText = "Waiting for Teacher";
  teacherList.append(placeholderOption);

  //--------------
  function removePlaceholderOption(optionElement, callback) {
    new MutationObserver(function (mutations) {
      if (!document.body.contains(optionElement)) {
        callback();
        this.disconnect();
      }
    }).observe(optionElement.parentElement, { childList: true });
  }

  removePlaceholderOption(placeholderOption, function () {
    console.log("The PlaceholderOption was removed!");
  });
  //---------------

  const teacherListLabel = document.createElement("label");
  teacherListLabel.setAttribute("for", "teacherList");
  teacherListLabel.innerText = "Select Teacher";

  const teacherSelectLine = document.createElement("div");
  teacherSelectLine.id = "teacherSelectLine";
  teacherSelectLine.append(teacherListLabel, teacherList);

  const classList = document.createElement("div");
  classList.id = "classList";
  classList.name = "classList";

  // const classSelectLineLabel = document.createElement("label");
  // classSelectLineLabel.setAttribute("for", "classList");
  // classSelectLineLabel.innerText = "Class";

  const classSelectLine = document.createElement("div");
  classSelectLine.id = "classSelectLine";
  // classSelectLine.innerText = "classSelectLine"

  // classSelectLine.append(classSelectLineLabel, classList);
  classSelectLine.append(classList);

  joinGameSection.append(teacherSelectLine, classSelectLine);
  mainContent.append(joinGameSection);
  if (sessionStorage.teacherEmails) {
    const existingTeacherEmails = JSON.parse(sessionStorage.teacherEmails);
    console.log(existingTeacherEmails);

    if (existingTeacherEmails.length > 0) {
      console.log("teachers: ", existingTeacherEmails);
      for (let i = 0; i < existingTeacherEmails.length; i++) {
        // console.log(existingTeacherEmails[i])
        const teacherOption = document.createElement("option");
        teacherOption.value = existingTeacherEmails[i].teacherEmail;
        teacherOption.innerText = existingTeacherEmails[i].teacherEmail;
        // teacherOption.setAttribute("for", "teacherList")

        const teacherList = document.getElementById("teacherList");
        console.log("teacherList: ", teacherList);
        if (teacherList) {
          console.log("present");
        }
        if (teacherList) {
          teacherList.append(teacherOption);
        }
      }
      document.getElementById("placeholderOption")?.remove();
    }
  } 
  
  // else {
    console.log("sending studentName...", sessionStorage.studentName);
    studentWebsocket.send(
      JSON.stringify({
        studentName: sessionStorage.studentName,
        studentID: sessionStorage.studentID
      })
    );
  // }

  createLogoutBtn(studentWebsocket);

  function handleTeacherListSelectionChange() {
    console.log('changed')
    const storedTeacherInformation = JSON.parse(sessionStorage.teacherEmails);

    for (let i = 0; i < storedTeacherInformation.length; i++) {
      if (storedTeacherInformation[i].teacherEmail === teacherList.value) {
        document.getElementById("classList").innerText =
          storedTeacherInformation[i].className;
        return;
      } else {
        document.getElementById("classList").innerText = "";
      }
      // console.log("changed...");

      studentWebsocket.send(
        JSON.stringify({
          changedTeacherList: true,
          teacherEmail: teacherList[i].value,
          studentName: sessionStorage.studentName,
          studentID: sessionStorage.studentID,
          className: storedTeacherInformation[i].className,
        })
      );
    }
  }
  // console.log("joining game as a student");
}
