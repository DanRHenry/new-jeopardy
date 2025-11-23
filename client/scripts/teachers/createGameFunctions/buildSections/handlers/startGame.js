import { buildTeacherLobby } from "../buildTeacherLobby.js";
import { openTeacherSideWebsocket } from "../../../openTeacherSideWebsocket.js";

export async function startGame(className, email, categoriesArray, gameNameInput) {
  buildTeacherLobby(className, categoriesArray);

  sessionStorage.studentList = JSON.stringify([]
  //   {
  //   studentNames: [],
  //   studentEmails: []
  // }
);

  openTeacherSideWebsocket(className, email, categoriesArray, gameNameInput)
}
