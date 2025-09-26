import { joinGame } from "../students/joinGame.js";
import { createGame } from "../teachers/createGame.js";
import { titleScreen } from "../titleScreen.js";

export async function login(email, password, role) {
    try{
        const formBody = JSON.stringify({
          email: email,
          password: password,
          role: role
        });
        
        const data = await fetch(
          "http://127.0.0.1:3350/api/new-jeopardy/user/login",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: formBody,
        }
    )
    const res = await data.json()
    if (res.message === "Login successful!") {
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
            console.log(res.token)
            sessionStorage.email = email
            sessionStorage.token = res.token
            sessionStorage.role = role
            createGame()
        } else if (res.user.role === "student") {
            joinGame()
        }
    }
    } 
    
    catch (err) {
        console.error(err)
    }
}