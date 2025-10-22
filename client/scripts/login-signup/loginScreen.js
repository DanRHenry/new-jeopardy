import { signup } from "./signup.js";

export async function loginScreen(role, studentWebsocket) {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";

  const loginScreenContent = document.createElement("div");
  loginScreenContent.id = "loginScreenContent";

  const loginForm = document.createElement("form");
  loginForm.id = `${role}LoginForm`

  loginForm.onsubmit = async function (e) {
    e.preventDefault();

    if (role === "teacher") {
      signup(this.email.value, this.password.value, role);
    }

    if (role === "student") {
      signup(
        this.email.value,
        this.password.value,
        role,
        this.studentNameInput.value,
        "teachername placeholder",
        studentWebsocket
      );
        const emailObj = JSON.stringify({
          studentEmail: sessionStorage.email,
        });
            console.log("sending email to everyone",emailObj)
          studentWebsocket.send(emailObj);
    }
  };

  const loginFormEmailInput = document.createElement("input");
  loginFormEmailInput.type = "email";
  loginFormEmailInput.name = "email";
  loginFormEmailInput.autocomplete = "on";
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
    const nameInput = document.createElement("input");
    nameInput.id = "studentNameInput";
    nameInput.name = "studentNameInput";
    nameInput.placeholder = "screen name";

    const emailAndPasswordLine = document.createElement("div");
    emailAndPasswordLine.id = "emailAndPasswordLine";

    emailAndPasswordLine.append(loginFormEmailInput, loginFormPasswordInput);

    loginForm.append(nameInput, emailAndPasswordLine, loginBtn);

    loginScreenContent.append(loginForm);
    mainContent.append(loginScreenContent);
  } else {
    loginForm.append(loginFormEmailInput, loginFormPasswordInput, loginBtn);

    loginScreenContent.append(loginForm);
    mainContent.append(loginScreenContent);
  }
}
