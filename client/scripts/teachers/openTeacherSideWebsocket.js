import { handleClickedSquare } from "../gameplay/handlers/handleClickedSquare.js";
import { websocketURL } from "../websocketURL.js";
import { beginGame } from "./createGameFunctions/buildSections/handlers/beginGame.js";
import { failureListings } from "../gameplay/failureListing.js";
import { successListings } from "../gameplay/successListing.js";
import { createGame } from "./createGame.js";

export function openTeacherSideWebsocket(
  className,
  email,
  categoriesArray,
  gameNameInput
) {
  // console.log(gameNameInput);
  const socket = new WebSocket(websocketURL);

  const emailObj = JSON.stringify({ teacherEmail: email });

  // Connection Opened:

  socket.addEventListener("open", function (event) {
    socket.send(emailObj);
    socket.send(
      JSON.stringify({ className: className, gameName: gameNameInput })
    );
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
          socket.send(
            JSON.stringify({ className: className, gameName: gameNameInput })
          );
          socket.send(JSON.stringify({ categoriesArray: categoriesArray }));
          const studentEmailRow = document.createElement("div");
          studentEmailRow.innerText = data.studentEmail;
          document.getElementById("studentEmailsList").append(studentEmailRow);

          if (!document.getElementById("beginGameBtn")) {
            const beginGameBtn = document.createElement("button");
            beginGameBtn.id = "beginGameBtn";
            beginGameBtn.innerText = "Begin Game";

            beginGameBtn.addEventListener("click", () => {
              socket.send(
                JSON.stringify({
                  cueToStart: "true",
                  className: className,
                  gameName: gameNameInput,
                })
              );
              beginGame(categoriesArray, socket, className, gameNameInput);
            });

            const backBtn = document.createElement("button")
            backBtn.id = "backBtn"
            backBtn.innerText = "Back"
            backBtn.addEventListener("click", createGame)

            const btnRow = document.createElement("div")
            btnRow.id = "btnRow"

            btnRow.append(backBtn, beginGameBtn)
            document.getElementById("studentEmailsHeader").before(btnRow);
          }
        }
      }

      if (data.squareClicked) {
        handleClickedSquare(data, socket);
      }

      if (data.buzzIn) {
        // console.log(data);
        document.getElementById(
          "studentAnswering"
        ).innerText = `${data.buzzIn} is answering...`;
        document.getElementById("buzzInBtn")?.remove();
      }

      if (data.correctAnswer) {
        // console.log("correct Answer was guessed: ", data);
        // console.log("play correct audio");

        const audioSrc = `./assets/audio/success/${pickRandomSong(
          successListings
        )}`;

        let mySound = new Audio(audioSrc);
        // console.log(sessionStorage.playSound);

        if (sessionStorage.playSound == "true") {
          mySound.play();
        }
        const studentList = JSON.parse(sessionStorage.studentList);

        const playerIndex = studentList.indexOf(data.playerName);

        let oldScore = Number(
          document.getElementsByClassName(`playerScores`)[playerIndex].innerText
        );

        let updatedScore = (oldScore += Number(data.score));

        // console.log(oldScore, data.score, updatedScore);

        // socket.send(
        //   JSON.stringify({
        //     correctPlayerBox: `playerScore${playerIndex}`,
        //     updatedScore: updatedScore,
        //   })
        // );

        sortUpdateAndSendScoreRankings(data, "correct");

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
        const audioSrc = `./assets/audio/failure/${pickRandomSong(
          failureListings
        )}`;

        let mySound = new Audio(audioSrc);
        if (sessionStorage.playSound == "true") {
          mySound.play();
        }

        if (data.playerName === sessionStorage.email) {
          sessionStorage.failedGuess = sessionStorage.email;
        }

        sortUpdateAndSendScoreRankings(data, "incorrect");

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

          // if (sessionStorage.failedGuess !== sessionStorage.email) {
          //   const buzzInBtn = document.createElement("button");
          //   buzzInBtn.id = "buzzInBtn";
          //   buzzInBtn.innerText = "Buzz";
          //   buzzInBtn.addEventListener("click", () => {
          //     handleBuzzIn(
          //       data.activePrompt,
          //       data.activeResponse,
          //       socket,
          //       data.score
          //     );
          //   });
          //   document.getElementById("promptResponseWindow").append(buzzInBtn);
          // }
        }
      }

      if (data.showResponse) {
        // console.log("showing response: ");
        document.getElementById(
          "promptText"
        ).innerText = `${data.activePrompt}: ${data.activeResponse}`;
        setTimeout(() => {
          document.getElementById("promptResponseWindow")?.remove();
          document.getElementById("backgroundOverlay")?.remove();
          sessionStorage.removeItem("failedGuess");
        }, 5000);
      }

      // if (data.incorrectPlayerBox) {
      //   // console.log("data: ",data)
      //   // if (
      //   //   document.getElementById(data.incorrectPlayerBox).innerText ===
      //   //   data.updatedScore
      //   // ) {
      //   //   return;
      //   // }
      //   // document.getElementById(data.incorrectPlayerBox).innerText =
      //   //   data.updatedScore;
      //   sortUpdateAndSendScoreRankings(data, "incorrectPlayerBox");
      //   // document.getElementById(data.incorrectPlayerBox).innerText = data.updatedScore;
      // }

      // if (data.correctPlayerBox) {
      //   // console.log("data: ",data)
      //   // if (
      //   //   document.getElementById(data.correctPlayerBox, "correctPlayerBox").innerText ===
      //   //   data.updatedScore
      //   // ) {
      //   //   return;
      //   // }

      //   sortUpdateAndSendScoreRankings(data);
      // }
    });
  });

  // ! --------------------- Functions ---------------------------

  function pickRandomSong(array) {
    const arrayLength = array.length;

    const randomNum = Math.floor(Math.random() * (arrayLength - 1));
    // console.log(randomNum);
    // console.log(array[randomNum]);

    return array[randomNum];
  }

  function sortUpdateAndSendScoreRankings(data, type) {
    const playerNames = document.getElementsByClassName("playerNames");
    const playerScores = document.getElementsByClassName("playerScores");

    const score = Number(data.score);

    for (let i = 0; i < playerNames.length; i++) {
      if (playerNames[i].innerText === data.playerName) {
        if (type === "correct") {
          playerScores[i].innerText = Number(playerScores[i].innerText) + score;
        }
        if (type === "incorrect") {
          playerScores[i].innerText = Number(playerScores[i].innerText) - score;
        }
      }
    }
    let players = [];
    for (let i = 0; i < playerNames.length; i++) {
      const object = {
        name: playerNames[i].innerText,
        score: Number(playerScores[i].innerText),
      };
      players.push(object);
    }

    players.sort(({ score: a }, { score: b }) => b - a);

    for (
      let i = 0;
      i < document.getElementsByClassName("playerNames").length;
      i++
    ) {
      document.getElementsByClassName("playerNames")[i].innerText = "";
      document.getElementsByClassName("playerScores")[i].innerText = "";
    }

    for (let i = 0; i < players.length; i++) {
      document.getElementsByClassName("playerNames")[i].innerText =
        players[i].name;
      document.getElementsByClassName("playerScores")[i].innerText =
        players[i].score;
    }
  }
}
