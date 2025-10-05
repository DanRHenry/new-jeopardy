import { handleClickedSquare } from "../gameplay/handlers/handleClickedSquare.js";
import { beginGame } from "../teachers/createGameFunctions/buildSections/handlers/beginGame.js";
import { websocketURL } from "../websocketURL.js";
import { handleBuzzIn } from "../gameplay/handlers/handleBuzzIn.js";

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
          const data = JSON.parse(message.data);
          if (data.teacherEmail) {
            // if (!sessionStorage.teacherEmail) {
            sessionStorage.teacherEmail = data.teacherEmail;
            socket.send(emailObj);
            // }
          }
          if (data.className) {
            sessionStorage.className = JSON.stringify(data.className);
            console.log(data.className);
          }

          if (data.categoriesArray) {
            console.log(data.categoriesArray);
            sessionStorage.categoriesArray = JSON.stringify(
              data.categoriesArray
            );
          }

          if (data.cueToStart) {
            console.log(data.cueToStart);
            beginGame(JSON.parse(sessionStorage.categoriesArray), socket);
          }

          if (data.squareClicked) {
            handleClickedSquare(data, socket);
          }

          if (data.activePrompt) {
            console.log("active prompt:", data.activePrompt);
          }

          if (data.activeResponse) {
            console.log("activeResponse: ", data.activeResponse);
          }

          if (data.buzzIn) {
            console.log(data);
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
            console.log(sessionStorage.email);
            console.log(data.playerName);

            if (data.playerName === sessionStorage.email) {
              sessionStorage.failedGuess = sessionStorage.email;
            }

            console.log("incorrect answer was guessed: ", data);

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
                  handleBuzzIn(data.activePrompt, data.activeResponse, socket);
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
      }
    });
  });
}
