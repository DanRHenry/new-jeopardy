import { serverURL } from "../../../serverURL.js";

export async function getAllGames() {
  try {
    const url = `${serverURL}/games/`;

    const res = await fetch(url, {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.token,
      },
    });

        const data = await res.json();

        // console.log("data: ",data)

        return data
  } catch (err) {
    console.error(err);
  }
}
