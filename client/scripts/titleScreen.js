
import { loginScreen } from "./login-signup/loginScreen.js";
import { logBackIn } from "./login-signup/logBackIn.js";

export async function titleScreen() {


  (async () => {
    const email = sessionStorage.email;
    const role = sessionStorage.role;
    const token = sessionStorage.token

    if (email && role === "teacher" && token) {
      console.log("email: ",email, "role: ",role, "token: ",token)
      logBackIn(email, token)
    }
  })()

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
    loginScreen("teacher");
  }

  function handleStudentBtnClick() {
    loginScreen("student")
  }

  teacherBtn.addEventListener("click", handleTeacherBtnClick);
  studentBtn.addEventListener("click", handleStudentBtnClick);

  const buttonLine = document.createElement("div");

  buttonLine.append(teacherBtn, studentBtn);
  titleBody.append(heroImg, buttonLine);

  mainContent.append(titleBody);
}
