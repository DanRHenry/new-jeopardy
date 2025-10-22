import { loginScreen } from "./login-signup/loginScreen.js";
import { logBackIn } from "./login-signup/logBackIn.js";
import { openStudentSideWebsocket } from "./students/openStudentSideWebsocket.js";
import { openTeacherSideWebsocket } from "./teachers/openTeacherSideWebsocket.js";

export async function titleScreen() {
  (async () => {
        sessionStorage.clear()

    const email = sessionStorage.email;
    const role = sessionStorage.role;
    const token = sessionStorage.token;
    let categoriesArray;
    if (sessionStorage.categoriesArray) {
      categoriesArray = JSON.parse(sessionStorage.categoriesArray);
    }

    const className = sessionStorage.className;
    const gameName = sessionStorage.gameName;

    // console.log(email, className, gameName, role, token, categoriesArray)

    if (email && className && gameName && role === "teacher" && token) {
      // console.log("email: ",email, "role: ",role, "token: ",token)
      // openTeacherSideWebsocket(className, email, categoriesArray, gameName);
      // logBackIn(email, token);
    } else if (email && role === "student" && token) {
      // console.log("email: ",email, "role: ",role, "token: ",token)
      // openStudentSideWebsocket();
      // logBackIn(email, token);
    }
  })();

  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";

  const titleBody = document.createElement("div");
  titleBody.id = "titleBody";

  const heroImg = document.createElement("img");
  heroImg.id = "heroImg";
  heroImg.src = "./assets/rock_jeopardy_logo.webp";

  //!------------------
  // Login buttons
  //!------------------

  const teacherBtn = document.createElement("button");
  teacherBtn.id = "teacherBtn";
  teacherBtn.innerText = "Teacher";

  const studentBtn = document.createElement("button");
  studentBtn.id = "studentBtn";
  studentBtn.innerText = "Student";

  //!-----------------
  // Event Listeners
  //!-----------------

  function handleTeacherBtnClick() {
    teacherBtn.removeEventListener("click", handleTeacherBtnClick)
    loginScreen("teacher");
  }

  function handleStudentBtnClick() {
    studentBtn.removeEventListener("click", handleStudentBtnClick)
    loginScreen("student", openStudentSideWebsocket());
  }

  teacherBtn.addEventListener("click", handleTeacherBtnClick);
  studentBtn.addEventListener("click", handleStudentBtnClick);

  const buttonLine = document.createElement("div");

  buttonLine.append(teacherBtn, studentBtn);
  titleBody.append(heroImg, buttonLine);

  mainContent.append(titleBody);
}
