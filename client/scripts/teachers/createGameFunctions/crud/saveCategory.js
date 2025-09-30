import { serverURL } from "../../../serverURL.js";

export async function saveCategory(object) {
  try {
    const {className, email, prompts, responses, category} = object

    const formBody = JSON.stringify({
      className: className,
      email: email,
      prompts: prompts,
      responses: responses,
      category: category
    });

    const data = await fetch(
      `${serverURL}/category/newCategory`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.token
        },
        body: formBody,
      }
    );
    const res = await data.json();
    console.log("res: ", res);
  } catch (err) {
    console.error(err);
  }
}
