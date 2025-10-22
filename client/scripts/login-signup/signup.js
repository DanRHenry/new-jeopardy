import { login } from "./login.js";
import {serverURL }from "../serverURL.js"

export async function signup(email, password, role, studentName, teacherName, studentWebsocket) {
  try {
    let formBody
    if (role === "teacher") {
      formBody = JSON.stringify({
        email: email,
        password: password,
        role: role,
      });
    }

    if (role === "student") {
        formBody = JSON.stringify({
        email: email,
        password: password,
        role: role,
      });
    }

    const data = await fetch(
      `${serverURL}/user/signup`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: formBody,
      }
    );
    // const res = await data.json();
    // console.log("res: ", res);
    // if (res.message === "existing user") {
      login(email, password, role, studentName, teacherName, studentWebsocket);
    // }
  } catch (err) {
    console.error(err);
  }
}
