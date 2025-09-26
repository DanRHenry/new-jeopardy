import { createGame } from "../teachers/createGame.js";
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

  loginForm.append(loginFormEmailInput, loginFormPasswordInput, loginBtn);

  loginScreenContent.append(loginForm);
  mainContent.append(loginScreenContent);
}
