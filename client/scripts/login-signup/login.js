import { joinGame } from "../students/joinGame.js";
import { createGame } from "../teachers/createGame.js";
import { titleScreen } from "../titleScreen.js";
import { serverURL } from "../serverURL.js";

export async function login(email, password, role, studentName, teacherName, studentWebsocket) {
  console.log("logging in...")
  try {
    const formBody = JSON.stringify({
      email: email,
      password: password,
      role: role,
    });

    const data = await fetch(`${serverURL}/user/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: formBody,
    });
    const res = await data.json();
    if (res.message === "Login successful!") 
      {
      if (res.user.role === "teacher") {
        // console.log(res.token);
        sessionStorage.email = email;
        sessionStorage.token = res.token;
        sessionStorage.role = role;
        // console.log("role: ", role);

        createGame();
      } else {
        console.log("role: student")
        // console.log(res.token);
        // sessionStorage.email = email;
        // sessionStorage.token = res.token;
        sessionStorage.role = role;
        sessionStorage.studentName = studentName;
        console.log("role: ", role);

        //   const emailObj = JSON.stringify({
        //   studentEmail: email,
        //   studentName: studentName
        // });
            // console.log("sending email to everyone",emailObj)
          // studentWebsocket.send(emailObj);

        joinGame(studentWebsocket);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
