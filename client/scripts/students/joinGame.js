import { websocketURL } from "../websocketURL.js";

export function joinGame() {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";
  console.log("joining game as a student");
  const emailObj = JSON.stringify({
    studentEmail: sessionStorage.email,
  });

  const socket = new WebSocket(websocketURL);

  socket.addEventListener("open", function (event) {
    socket.send(emailObj);

    socket.addEventListener("message", function (message) {
      if (message) {
        if (message.data !== "welcomeMessage") {
          console.log(message.data)
          const data = JSON.parse(message.data);
          if (data.teacherEmail) {
            if (!sessionStorage.teacherEmail) {
              sessionStorage.teacherEmail = data.teacherEmail;
              socket.send(emailObj);
            }
          }
          if (data.className) {
            sessionStorage.className = JSON.stringify(data.className)
            console.log(data.className)
          }

          if (data.categoriesArray){
            console.log(data.categoriesArray)
            sessionStorage.categoriesArray = JSON.stringify(data.categoriesArray)
          }
        }
      }
    });
  });
}
