import { handleClickedSquare } from "../gameplay/handlers/handleClickedSquare.js";
import { websocketURL } from "../websocketURL.js";
import { beginGame } from "./createGameFunctions/buildSections/handlers/beginGame.js";

export function openTeacherSideWebsocket(className, email, categoriesArray, gameNameInput) {
  console.log(gameNameInput)
  const socket = new WebSocket(websocketURL);

  const emailObj = JSON.stringify({ teacherEmail: email });

  // Connection Opened:

  socket.addEventListener("open", function (event) {
    socket.send(emailObj);
    socket.send(JSON.stringify({ className: className, gameName: gameNameInput }));
    socket.send(JSON.stringify({ categoriesArray: categoriesArray }));

    socket.addEventListener("message", function (message) {
      const data = JSON.parse(message.data);

      if (data.studentEmail) {
        let studentList = JSON.parse(sessionStorage.studentList);
        // console.log(studentList, typeof studentList);
        if (!studentList.includes(data.studentEmail)) {
          studentList.push(data.studentEmail);
          sessionStorage.studentList = JSON.stringify(studentList);
          socket.send(emailObj);
          socket.send(JSON.stringify({ className: className, gameName: gameNameInput }));
          socket.send(JSON.stringify({ categoriesArray: categoriesArray }));
          const studentEmailRow = document.createElement("div");
          studentEmailRow.innerText = data.studentEmail;
          document.getElementById("studentEmailsList").append(studentEmailRow);

          if (!document.getElementById("beginGameBtn")) {
            const beginGameBtn = document.createElement("button");
            beginGameBtn.id = "beginGameBtn";
            beginGameBtn.innerText = "Begin Game";

            beginGameBtn.addEventListener("click", () => {
              socket.send(JSON.stringify({ cueToStart: "true", className: className, gameName: gameNameInput }));
              beginGame(categoriesArray, socket, className, gameNameInput);
            });

            document.getElementById("studentEmailsHeader").before(beginGameBtn);
          }
        }
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

        const studentList = JSON.parse(sessionStorage.studentList);

        const playerIndex = studentList.indexOf(data.playerName);

        let oldScore = Number(
          document.getElementsByClassName(`playerScores`)[playerIndex].innerText
        );

        let updatedScore = (oldScore += Number(data.score));

        console.log(oldScore, data.score, updatedScore);

        socket.send(
          JSON.stringify({
            correctPlayerBox: `playerScore${playerIndex}`,
            updatedScore: updatedScore,
          })
        );

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

        const studentList = JSON.parse(sessionStorage.studentList);

        const playerIndex = studentList.indexOf(data.playerName);

        let oldScore = Number(
          document.getElementsByClassName(`playerScores`)[playerIndex].innerText
        );

        let updatedScore = (oldScore -= Number(data.score));

        console.log("oldScore, change, updated", data.score, oldScore, updatedScore);

        socket.send(
          JSON.stringify({
            incorrectPlayerBox: `playerScore${playerIndex}`,
            updatedScore: updatedScore,
          })
        );

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

          if (sessionStorage.failedGuess !== sessionStorage.email) {
            const buzzInBtn = document.createElement("button");
            buzzInBtn.id = "buzzInBtn";
            buzzInBtn.innerText = "Buzz";
            buzzInBtn.addEventListener("click", () => {
              handleBuzzIn(data.activePrompt, data.activeResponse, socket);
            });

            document.getElementById("promptResponseWindow").append(buzzInBtn);
          }
        }
      }

      if (data.showResponse) {
        console.log("showing response: ");
        document.getElementById(
          "promptText"
        ).innerText = `${data.activePrompt}: ${data.activeResponse}`;
        setTimeout(() => {
          document.getElementById("promptResponseWindow")?.remove();
          document.getElementById("backgroundOverlay")?.remove();
          sessionStorage.removeItem("failedGuess");
        }, 5000);
      }

      if (data.incorrectPlayerBox) {
        console.log(data);
                document.getElementById(data.incorrectPlayerBox).innerText =
          data.updatedScore;

      }

      if (data.correctPlayerBox) {
        console.log(data);

        document.getElementById(data.correctPlayerBox).innerText =
          data.updatedScore;
      }
    });
  });
}
