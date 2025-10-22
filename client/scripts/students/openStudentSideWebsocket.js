import { handleClickedSquare } from "../gameplay/handlers/handleClickedSquare.js";
import { beginGame } from "../teachers/createGameFunctions/buildSections/handlers/beginGame.js";
import { handleBuzzIn } from "../gameplay/handlers/handleBuzzIn.js";
import { websocketURL } from "../websocketURL.js";

export function openStudentSideWebsocket() {

  const socket = new WebSocket(websocketURL);


  socket.addEventListener("open", function (event) {
    console.log("student socket open")

  socket.send(JSON.stringify({"requestTeacherEmail": true}))

    socket.addEventListener("message", function (message) {
      if (message) {
        if (message === "terminating websocket") {
          console.log("the socket is closed")
        }

          const data = JSON.parse(message.data);
          if (data.teacherEmail) {
            console.log("teacher email received: ", data.teacherEmail)
            if (!sessionStorage.teacherEmail) {
            console.log(data.teacherEmail, " received")
            sessionStorage.teacherEmail = data.teacherEmail;

            const teacherOption = document.createElement("option")
            teacherOption.value = data.teacherEmail;
            teacherOption.innerText = data.teacherEmail
            // teacherOption.setAttribute("for", "teacherList")

            const teacherList = document.getElementById("teacherList")
            if (teacherList) {
              teacherList.append(teacherOption)
            }
  const emailObj = JSON.stringify({ studentEmail: sessionStorage.email, studentName: sessionStorage.studentName });

            socket.send(emailObj);
            }
          }

          if (data.className) {
            sessionStorage.className = JSON.stringify(data.className);
          }

          if (data.categoriesArray) {
            sessionStorage.categoriesArray = JSON.stringify(
              data.categoriesArray
            );
          }

          if (data.cueToStart) {
            beginGame(
              JSON.parse(sessionStorage.categoriesArray),
              socket,
              data.className,
              data.gameName
            );
          }

          if (data.squareClicked) {
            handleClickedSquare(data, socket);
          }

          if (data.buzzIn) {
            document.getElementById(
              "studentAnswering"
            ).innerText = `${data.buzzIn} is answering...`;
            document.getElementById("buzzInBtn")?.remove();
          }

          if (data.correctAnswer) {
            console.log("correct Answer was guessed: ", data);

            const correctNotification = document.createElement("div");
            correctNotification.id = "correctNotification";
            correctNotification.innerText = `Correct!`;

            if (!document.getElementById("correctNotification")) {
              document
                .getElementById("studentAnswering")
                .append(correctNotification);

              setTimeout(() => {
                sessionStorage.removeItem("failedGuess");

                document.getElementById("promptResponseWindow")?.remove();
                document.getElementById("backgroundOverlay")?.remove();
              }, 3000);
            }
          }

          if (data.incorrectAnswer) {
            if (data.playerName === sessionStorage.email) {
              sessionStorage.failedGuess = sessionStorage.email;
            }

            const incorrectNotification = document.createElement("div");
            incorrectNotification.id = "incorrectNotification";
            incorrectNotification.innerText = `Sorry ${data.playerName}, ${data.incorrectAnswer} was the wrong answer.`;

            if (!document.getElementById("incorrectNotification")) {
              document
                .getElementById("studentAnswering")
                .append(incorrectNotification);
              setTimeout(() => {
                document.getElementById("studentAnswering").innerText = "";
              }, 3000);

              console.log(sessionStorage.email);
              console.log(sessionStorage.failedGuess);

              if (sessionStorage.failedGuess !== sessionStorage.email) {
                const buzzInBtn = document.createElement("button");
                buzzInBtn.id = "buzzInBtn";
                buzzInBtn.innerText = "Buzz";
                buzzInBtn.addEventListener("click", () => {
                  handleBuzzIn(
                    data.activePrompt,
                    data.activeResponse,
                    socket,
                    data.score
                  );
                });

                document
                  .getElementById("promptResponseWindow")
                  .append(buzzInBtn);
              }
            }
          }

          if (data.showResponse) {
            document.getElementById(
              "promptText"
            ).innerText = `${data.activePrompt}: ${data.activeResponse}`;
            setTimeout(() => {
              document.getElementById("promptResponseWindow")?.remove();
              document.getElementById("backgroundOverlay")?.remove();
              sessionStorage.removeItem("failedGuess");
            }, 5000);
          }
      }
    });

    socket.onclose = (event) => {
    console.log("The connection has been closed successfully.");
    return;
};
    
  });
  return socket;
}
