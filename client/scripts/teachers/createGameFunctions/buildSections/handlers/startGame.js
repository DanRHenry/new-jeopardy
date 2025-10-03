import { serverURL } from "../../../../serverURL.js";
import { websocketURL } from "../../../../websocketURL.js";
import { buildTeacherLobby } from "../buildTeacherLobby.js";

export async function startGame(className, email, categoriesArray) {
  buildTeacherLobby();
  console.log("starting", categoriesArray);

  console.log(className);
  console.log(email);
  console.log(categoriesArray);

  const socket = new WebSocket(websocketURL);

  const emailObj = JSON.stringify({ teacherEmail: email });

  sessionStorage.studentList = JSON.stringify([]);
  // Connection Opened:

  socket.addEventListener("open", function (event) {
    console.log(className, categoriesArray)
    socket.send(emailObj);
    socket.send(JSON.stringify({ className: className }));
    socket.send(JSON.stringify({ categoriesArray: categoriesArray }));

    socket.addEventListener("message", function (message) {
      if (message.data !== "welcomeMessage") {
        const data = JSON.parse(message.data);

        if (data.studentEmail) {
          let studentList = JSON.parse(sessionStorage.studentList);
          console.log(studentList, typeof studentList)
          if (!studentList.includes(data.studentEmail)) {
            studentList.push(data.studentEmail);
            sessionStorage.studentList = JSON.stringify(studentList);
            socket.send(emailObj);
            socket.send(JSON.stringify({ className: className }));
            socket.send(JSON.stringify({ categoriesArray: categoriesArray }));
            const studentEmailRow = document.createElement("div");
            studentEmailRow.innerText = data.studentEmail;
            document
              .getElementById("studentEmailsList")
              .append(studentEmailRow);
          }
        }
      }
    });
  });
}
