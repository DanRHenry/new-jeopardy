import { buildTeacherLobby } from "../buildTeacherLobby.js";
import { openTeacherSideWebsocket } from "../../../openTeacherSideWebsocket.js";

export async function startGame(className, email, categoriesArray) {
  buildTeacherLobby();

  sessionStorage.studentList = JSON.stringify([]);

  openTeacherSideWebsocket(className, email, categoriesArray)
}
