import { serverURL } from "../../../serverURL.js";

export async function getAllCategories() {
  try {
    const url = `${serverURL}/category/`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.token
      }
    });

    const data = await res.json()
    // console.log("existing data: ",data.categories)
    return data.categories;
  } catch (err) {
    console.error(err);
  }
}
