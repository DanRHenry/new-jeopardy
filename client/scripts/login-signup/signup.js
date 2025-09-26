import { login } from "./login.js";
import {serverURL }from "../serverURL.js"

export async function signup(email, password, role) {
  try {
    const formBody = JSON.stringify({
      email: email,
      password: password,
      role: role,
    });

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
      login(email, password, role);
    // }
  } catch (err) {
    console.error(err);
  }
}
