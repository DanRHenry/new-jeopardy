import { titleScreen } from "../titleScreen.js";
export function createLogoutBtn(socket) {
    console.log("socket: ",socket)
  const logoutBtn = document.createElement("button");
  logoutBtn.id = "logoutBtn";
  logoutBtn.innerText = "Logout";
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("teacherEmail");
    sessionStorage.removeItem("studentList");
    sessionStorage.removeItem("className");
    sessionStorage.removeItem("categoriesArray");
    sessionStorage.removeItem("studentList");
    sessionStorage.removeItem("studentName");
    sessionStorage.removeItem("className");
    sessionStorage.removeItem("categoriesArray");
    sessionStorage.removeItem("gameName");
    console.log("session storage items removed...");
    // logoutBtn.remove();
    // titleScreen();
    document.getElementById("enableSoundsBtn")?.remove();
    console.log("sending close socket");
    const closesocketobject = JSON.stringify({
"closeWebsocket": "true"
    })
    socket.send(closesocketobject);
    console.log("sent",closesocketobject)
    window.location.reload()
  });

  document.getElementById("mainContent").before(logoutBtn);
}
