export async function buildTeacherLobby(className, categoriesArray) {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";

  const pendingGameWindow = document.createElement("div");
  pendingGameWindow.id = "pendingGameWindow";

  const studentListSection = document.createElement("div");
  studentListSection.id = "studentListSection";

  const studentEmailsHeader = document.createElement("div");
  studentEmailsHeader.id = "studentEmailsHeader";
  studentEmailsHeader.innerText = "Students";

  const studentEmailsList = document.createElement("div");
  studentEmailsList.id = "studentEmailsList";

  studentListSection.append(studentEmailsHeader, studentEmailsList);

  pendingGameWindow.append(studentListSection);

  mainContent.append(pendingGameWindow);

  const enableSoundsBtn = document.createElement("button");
  enableSoundsBtn.id = "enableSoundsBtn";
  enableSoundsBtn.innerText = "Enable Sounds";
  sessionStorage.playSound = "false";
  enableSoundsBtn.addEventListener("click", () => {
    if (enableSoundsBtn.innerText === "Disable Sounds") {
      sessionStorage.playSound = "false";
      enableSoundsBtn.innerText = "Enable Sounds";
    } else if (enableSoundsBtn.innerText === "Enable Sounds") {
      sessionStorage.playSound = "true";
      enableSoundsBtn.innerText = "Disable Sounds";
    }
  });

  const studentsTypeOrTeacherJudgesCheckbox = document.createElement("input");
  studentsTypeOrTeacherJudgesCheckbox.id =
    "studentsTypeOrTeacherJudgesCheckbox";
  studentsTypeOrTeacherJudgesCheckbox.name = "studentsTypeOrTeacherJudgesCheckbox"
  studentsTypeOrTeacherJudgesCheckbox.type = "checkbox"
  studentsTypeOrTeacherJudgesCheckbox.addEventListener(
    "change",
    selectTypeOrJudge
  );

  const typeOrTeachLabel = document.createElement("label")
  typeOrTeachLabel.setAttribute("for", "studentsTypeOrTeacherJudgesCheckbox")
  typeOrTeachLabel.innerText = "Type or Teacher"

  studentsTypeOrTeacherJudgesCheckbox.before(typeOrTeachLabel)

  pendingGameWindow.append(studentsTypeOrTeacherJudgesCheckbox)

  document.getElementById("mainContent").before(enableSoundsBtn);

  //! ------------- functions ---------------------

function selectTypeOrJudge() {
    const studentsTypeOrTeacherJudgesCheckbox = document.getElementById("studentsTypeOrTeacherJudgesCheckbox")

    console.log(studentsTypeOrTeacherJudgesCheckbox.checked)

    sessionStorage.teacherJudges = studentsTypeOrTeacherJudgesCheckbox.checked;
  }
}
