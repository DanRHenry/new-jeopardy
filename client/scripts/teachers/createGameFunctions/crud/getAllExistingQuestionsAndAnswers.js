import { serverURL } from "../../../serverURL.js";

export async function getAllExistingQuestionsAndAnswers() {

    const url = `${serverURL}/questionAndAnswer/${sessionStorage.email}`
    // console.log("url: ",url)
    try{
        const token = sessionStorage.token;
        const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    });
    const res = await data.json();
    return res.getAllQuestionsAndAnswers
  } catch (err) {
    console.error(err);
  }
}