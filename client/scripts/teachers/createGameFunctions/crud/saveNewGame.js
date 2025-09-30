import { serverURL } from "../../../serverURL.js";

export async function saveNewGame(gameName, className, email, categoriesArray) {
  console.log("starting", categoriesArray);

//   console.log(gameName)
//     console.log(className)
//     console.log(email)
    // console.log(categoriesArray)

  const url = `${serverURL}/games/newgame/`;

  console.log("url: ",url)

  const body = {
    gameName: gameName,
    className: className,
    email: email,
    categoriesArray: categoriesArray
  }

  console.log("body",body)

  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.token,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json()

  if (await data.message === "existing game") {
    return await data.message}
}
