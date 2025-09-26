import { serverURL } from "../../../serverURL.js";
import { createGame } from "../../createGame.js";

export async function submitNewQuestionAndAnswer(
  defaultCategory,
  defaultClass,
  question,
  answer,
  email
) {
  console.log("submitting questions and answers...");
  console.log(
    "submitting: ",
    "defaultClass",
    defaultClass,
    "defaultCategory: ",
    defaultCategory,
    "questions: ",
    question,
    "answers: ",
    answer,
    "email: ",
    email
  );

  try {
    const url = `${serverURL}/questionAndAnswer/store`;

    const formBody = {
      defaultCategory: defaultCategory,
      defaultClass: defaultClass,
      question: question,
      answer: answer,
      email: email,
    };

    console.log(formBody)

    const data = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.token
      },
      body: JSON.stringify(formBody),
    });
    const res = await data.json();
    if (res.message === "Success! Question and Answer Saved!"){
      createGame()
    }
    console.log("res: ", res);
  } catch (err) {
    console.error(err);
  }
}
