import { createGame } from "../teachers/createGame.js";
import { openStudentSideWebsocket } from "../students/openStudentSideWebsocket.js";
import { signup } from "./signup.js";

export async function loginScreen(role) {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";

  const loginScreenContent = document.createElement("div");
  loginScreenContent.id = "loginScreenContent";

  const loginForm = document.createElement("form");
  loginForm.id = "teacherLoginForm";
  loginForm.onsubmit = async function (e) {
    e.preventDefault();

    signup(this.email.value, this.password.value, role)
}


  const loginFormEmailInput = document.createElement("input");
  loginFormEmailInput.type = "email";
  loginFormEmailInput.name = "email";
  loginFormEmailInput.id = "loginFormEmailInput";
  loginFormEmailInput.placeholder = "email";

  const loginFormPasswordInput = document.createElement("input");
  loginFormPasswordInput.id = "loginFormPasswordInput";
  loginFormPasswordInput.name = "password";
  loginFormPasswordInput.type = "password";
  loginFormPasswordInput.placeholder = "password";

  const loginBtn = document.createElement("button");
  loginBtn.type = "submit";
  loginBtn.innerText = "Submit";

  if (role === "student") {
    const nameInput = document.createElement("input")
    nameInput.id = "studentNameInput"
    nameInput.placeholder = 'name'

    const teacherList = document.createElement("input")
    teacherList.id = "teacherList"
    teacherList.name = "teacherList"
    
    const teacherListLabel = document.createElement("label")
    teacherListLabel.setAttribute("for", "teacherList")
    teacherListLabel.innerText = "Select Teacher"

      loginForm.append(nameInput, loginFormEmailInput, loginFormPasswordInput, teacherListLabel,teacherList, loginBtn);

      loginScreenContent.append(loginForm);
      mainContent.append(loginScreenContent);

      openStudentSideWebsocket()
  }

  else {
  loginForm.append(loginFormEmailInput, loginFormPasswordInput, loginBtn);

  loginScreenContent.append(loginForm);
  mainContent.append(loginScreenContent);
  }

}
