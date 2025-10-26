import { handleClickedSquare } from "../gameplay/handlers/handleClickedSquare.js";
import { websocketURL } from "../websocketURL.js";
import { beginGame } from "./createGameFunctions/buildSections/handlers/beginGame.js";
import { failureListings } from "../gameplay/failureListing.js";
import { successListings } from "../gameplay/successListing.js";
import { createGame } from "./createGame.js";
import { createLogoutBtn } from "../login-signup/createLogoutBtn.js";

export function openTeacherSideWebsocket(
  className,
  email,
  categoriesArray,
  gameNameInput
) {
  const socket = new WebSocket(websocketURL);

  const emailObj = JSON.stringify({ teacherEmail: email });

  socket.addEventListener("open", function (event) {
    console.log("teacher socket opened");

    socket.send(emailObj);

    sendEmailClassNameGameNameandCategories();

    socket.addEventListener("message", function (message) {
      // console.log("received: ", message.data);
      if (message === "terminating websocket") {
        console.log("the socket is closed");
      }

      const data = JSON.parse(message.data);

      if (data.studentEmail) {
        console.log("student email received: ", data.studentEmail);

        sendEmailClassNameGameNameandCategories();

        let studentList = JSON.parse(sessionStorage.studentList);
        console.log(studentList, typeof studentList);
        console.log(data);
        if (!studentList.studentEmails.includes(data.studentEmail)) {
          studentList.studentNames.push(data.studentName);
          studentList.studentEmails.push(data.studentEmail);

          sessionStorage.studentList = JSON.stringify(studentList);

          const studentNameRow = document.createElement("div");
          // studentNameRow.innerText = data.studentName;
          studentNameRow.id = data.studentEmail;
          // document.getElementById
          studentNameRow.className = "studentDisplayNames";

          const studentDisplayName = document.createElement("div");
          studentDisplayName.innerText = data.studentName;

          const removeStudentCheckbox = document.createElement("input");
          removeStudentCheckbox.type = "checkbox";
          removeStudentCheckbox.className = "removeStudentCheckboxes";

          removeStudentCheckbox.addEventListener("click", () => {
            studentDisplayName.style.textDecoration =
              removeStudentCheckbox.checked === true ? "line-through" : null;
          });

          studentNameRow.append(studentDisplayName, removeStudentCheckbox);

          document.getElementById("studentNamesList").append(studentNameRow);

          if (!document.getElementById("beginGameBtn")) {
            const beginGameBtn = document.createElement("button");
            beginGameBtn.id = "beginGameBtn";
            beginGameBtn.innerText = "Begin Game";

            beginGameBtn.addEventListener("click", () => {
              const banList = [];
              const studentDisplayNames = document.getElementsByClassName(
                "studentDisplayNames"
              );
              for (let i = 0; i < studentDisplayNames.length; i++) {
                console.log(studentDisplayNames[i]);
                if (
                  document.getElementsByClassName("removeStudentCheckboxes")[i]
                    .checked
                ) {
                  studentDisplayNames[i].style.textDecoration ===
                    "line-through";
                  banList.push(studentDisplayNames[i].id);
                }
              }

              socket.send(JSON.stringify({ banList: banList }));

              const studentList = JSON.parse(sessionStorage.studentList);

              for (let i = 0; i < banList.length; i++) {
                console.log(banList[i]);
                let index = studentList.studentEmails.indexOf(banList[i]);

                studentList.studentNames.splice(index, 1);
                studentList.studentEmails.splice(index, 1);

                sessionStorage.studentList = JSON.stringify(studentList);
              }

              if (studentList.studentNames.length > 0) {
                socket.send(
                  JSON.stringify({
                    cueToStart: "true",
                    className: className,
                    gameName: gameNameInput,
                    teacherJudgesResponses: sessionStorage.teacherJudgesResponses
                  })
                );
                console.log("beginning game...");
                beginGame(categoriesArray, socket, className, gameNameInput);
              }
            });

            const backBtn = document.createElement("button");
            backBtn.id = "backBtn";
            backBtn.innerText = "Back";

            backBtn.addEventListener("click", () => {
              sessionStorage.removeItem("gameName");
              sessionStorage.removeItem("categoriesArray");
              sessionStorage.removeItem("studentList");
              console.log("sending close socket");
              const closesocketobject = JSON.stringify({
                closeWebsocket: "true",
              });
              socket.send(JSON.stringify({ removeTeacher: true }));
              socket.send(closesocketobject);
              console.log("sent", closesocketobject);

              socket.close();
              createGame();
            });

            const btnRow = document.createElement("div");
            btnRow.id = "btnRow";

            btnRow.append(backBtn, beginGameBtn);
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

      if (sessionStorage.teacherJudgesResponses === "true") {
        const correctIncorrectBtnsLine = document.createElement("div");
        correctIncorrectBtnsLine.id = "correctIncorrectBtnsLine";

        const correctBtn = document.createElement("button");
        correctBtn.innerText = "Correct";
        correctBtn.addEventListener("click", () =>
          handleCorrectAnswer ("", data.buzzIn, 0)
        );

        const incorrectBtn = document.createElement("button");
        incorrectBtn.innerText = "Incorrect";
        incorrectBtn.addEventListener("click", () =>
          console.log("incorrect clicked")
        );

        correctIncorrectBtnsLine.append(incorrectBtn, correctBtn);
        document.getElementById("studentAnswering").after(correctIncorrectBtnsLine);
      }
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

        const playerIndex = studentList.studentEmails.indexOf(
          data.studentEmail
        );

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

      if (data.leaveGame) {
        console.log("student leaving", data.studentName);
        document.getElementById(data.studentEmail)?.remove();
        const studentList = JSON.parse(sessionStorage.studentList);

        const index = studentList.studentEmails.indexOf(data.studentEmail);

        studentList.studentEmails.splice(index, 1);

        studentList.studentNames.splice(index, 1);

        sessionStorage.studentList = JSON.stringify(studentList);

        console.log("leave game received");
      }

      if (data.quitGame) {
        console.log("quitting game");
      }
    });
    createLogoutBtn(socket);
  });

  // ! --------------------- Functions ---------------------------

  function pickRandomSong(array) {
    const arrayLength = array.length;

    const randomNum = Math.floor(Math.random() * (arrayLength - 1));
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

  function sendEmailClassNameGameNameandCategories() {
    socket.send(emailObj);
    socket.send(
      JSON.stringify({ className: className, gameName: gameNameInput})
    );
    socket.send(JSON.stringify({ categoriesArray: categoriesArray }));
  }

  function handleCorrectAnswer (correctAnswer, playerName, score) {
          console.log("correct");
          console.log(correctAnswer)
          console.log(playerName)
          console.log(score)
      socket.send(
        JSON.stringify({
          correctAnswer: correctAnswer,
          playerName: playerName,
          score: score
        })
      );

      // socket.send(JSON.stringify({playCorrectSound: true}))
  }
}
