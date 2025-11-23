import { titleScreen } from "../titleScreen.js";
import { logOut } from "./logOut.js";
export function createLogoutBtn(socket) {
  console.log("role: ",sessionStorage.role)
    // console.log("socket: ",socket)
  const logoutBtn = document.createElement("button");
  logoutBtn.id = "logoutBtn";
  logoutBtn.innerText = "Logout";
  logoutBtn.addEventListener("click", () => {logOut(socket)});

  document.getElementById("mainContent").before(logoutBtn);
}
