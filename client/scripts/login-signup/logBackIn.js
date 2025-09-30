import { joinGame } from "../students/joinGame.js";
import { createGame } from "../teachers/createGame.js";
import { titleScreen } from "../titleScreen.js";

export async function logBackIn(email, token) {
  try {
    if (token === "undefined") {
        return
    }
    const formBody = JSON.stringify({
      email: email,
    });

    const data = await fetch(
      "http://127.0.0.1:3350/api/new-jeopardy/user/findOne",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: formBody,
      }
    );
    const res = await data.json();

    // console.log("logged back in")
    // console.log(res.message)
    const message = await res.message

    const response = res
    // console.log("response: ",response)
    if (message === "Found!") {
    //   console.log(res.message, res.body);
            const logoutBtn = document.createElement("button")
            logoutBtn.id = "logoutBtn"
            logoutBtn.innerText = "Logout"
            logoutBtn.addEventListener("click",() => {
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("email")
                sessionStorage.removeItem("role")
                logoutBtn.remove()
                titleScreen()
            })
    
                        document.getElementById("mainContent").before(logoutBtn)
      if (res.user.role === "teacher") {
        // console.log(res.token);
        sessionStorage.email = res.user.email;
        sessionStorage.role = res.user.role;
        createGame();
      } else if (res.user.role === "student") {
        joinGame();
      }
    }
  } catch (err) {
    console.error(err);
  }
}
