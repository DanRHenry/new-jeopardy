import { handleClickedSquare } from "../gameplay/handlers/handleClickedSquare.js";
import { beginGame } from "../teachers/createGameFunctions/buildSections/handlers/beginGame.js";
import { handleBuzzIn } from "../gameplay/handlers/handleBuzzIn.js";
import { websocketURL } from "../websocketURL.js";

import { logOut } from "../login-signup/logOut.js";
export function openStudentSideWebsocket() {
  const socket = new WebSocket(websocketURL);

  const studentObj = {
    // studentEmail: sessionStorage.email,
    studentName: sessionStorage.studentName,
  };

  socket.addEventListener("open", function (event) {
    console.log("student socket open");

    const IDRequest = JSON.stringify({ studentIDRequest: true });
    //! ---------- Send a request to the server for a unique ID
    socket.send(IDRequest);

    socket.addEventListener("message", function (message) {
      if (message) {
        if (message === "terminating websocket") {
          console.log("the socket is closed");
        }

        const data = JSON.parse(message.data);
        console.log("data: ", data);

        //! -------------- Receive unique student ID
        if (data.studentIDResponse) {
          sessionStorage.studentID = data.studentIDResponse;
        }

        //-----------------------------------------------

        if (data.teacherEmail && !data.className) {
          console.log("no class name but received teacher email: ", data)
              studentObj.studentID = sessionStorage.studentID;
              studentObj.studentName = sessionStorage.studentName;
              // alert(`Student Object: ${JSON.stringify(studentObj)}`)

              socket.send(JSON.stringify(studentObj)); //todo change this to an event listener that sends student name, class, and teacher
              console.log("teacher email received without classname. sent student information")
              console.log("studentObj: ", studentObj)
        }

        if (data.teacherEmail && data.className) {
          console.log("teacher email received: ", data);
          const teacherEmailsStored =
            sessionStorage.getItem("teacherEmails") || [];
          console.log("currentTeacherEmails", teacherEmailsStored);

          if (
            !teacherEmailsStored.includes(
              JSON.stringify({
                teacherEmail: data.teacherEmail,
                className: data.className,
              })
            )
          ) {
            console.log(data.teacherEmail, " received");

            //! ----------- Update Session Storage Teacher Emails Array
            if (!sessionStorage.teacherEmails) {
              sessionStorage.teacherEmails = JSON.stringify([]);
            }

            if (sessionStorage.teacherEmails) {
              const previousTeacherEmails = JSON.parse(
                sessionStorage.teacherEmails
              );

              previousTeacherEmails.push(data);

              sessionStorage.teacherEmails = JSON.stringify(
                previousTeacherEmails
              );

              //! ------------- Add New Teacher Email to Student User Interface

              // let teacherList = document.getElementById("teacherList");
              // teacherList?.removeEventListener(
              //   "change",
              //   handleTeacherListSelectionChange
              // );

              // teacherList?.remove()

              // teacherList = document.createElement("select");
              // teacherList.id = "teacherList";
              // teacherList.name = "teacherList";

              // teacherList.addEventListener(
              //   "change",
              //   handleTeacherListSelectionChange
              // );

              document.getElementById("placeholderOption")?.remove()

              const teacherEmails = JSON.parse(sessionStorage.teacherEmails);

              console.log(typeof teacherEmails, teacherEmails);

              for (let i = 0; i < teacherEmails.length; i++) {}

              const teacherOption = document.createElement("option");
              teacherOption.value = data.teacherEmail;
              teacherOption.innerText = data.teacherEmail;

              if (teacherList) {
                if (document.getElementById("placeholderOption")) {
                  document.getElementById("placeholderOption").remove();
                }

                teacherList.append(teacherOption);

                for (let i = 0; i < previousTeacherEmails.length; i++) {
                  if (
                    previousTeacherEmails[i].teacherEmail === teacherList.value
                  ) {
                    document.getElementById("classList").innerText =
                      previousTeacherEmails[i].className;
                  }
                }
              }

              studentObj.studentID = sessionStorage.studentID;
              studentObj.studentName = sessionStorage.studentName;
              // alert(`Student Object: ${JSON.stringify(studentObj)}`)
              console.log("sending student object, ", JSON.stringify(studentObj))
              socket.send(JSON.stringify(studentObj)); //todo change this to an event listener that sends student name, class, and teacher
            }
          }
        }

        if (data.removeTeacher) {
          const existingTeacherOptionsList =
            document.querySelectorAll("option");
          console.log("removing teacher: ", data, "from: ");
          console.table(existingTeacherOptionsList);

          for (let i = 0; i < existingTeacherOptionsList.length; i++) {
            //todo - check this to see if it will work as expected or will create bugs
            if (
              existingTeacherOptionsList[i].value ===
              sessionStorage.teacherEmails[i].teacherEmail
            ) {
              existingTeacherOptionsList[i].remove();
            }
          }
          sessionStorage.removeItem("teacherEmail");
        }

        // if (data.studentID) {
        //   socket.send(
        //     JSON.stringify({
        //       studentName: sessionStorage.studentName,
        //       studentID: studentID,
        //     })
        //   ); //todo change this to an event listener that sends student name, class, and teacher
        //   console.log("sending id: ", studentID, "for", studentName);
        // }

        if (data.removeStudent) {
          console.log("remove request received");
        }

        // if (data.className) {
        //   console.log(data)
        //     const previousClassNames = sessionStorage.classNames || []
        //     previousClassNames.push(data.className)
        //     sessionStorage.classNames = JSON.stringify(previousClassNames)

        //     const classOption = document.createElement("div")
        //     classOption.value = data.className;
        //     classOption.innerText = data.className;

        //     const classList = document.getElementById("classList");
        //     if (classList) {
        //       classList.append(classOption);
        //     }

        // }

        if (data.categoriesArray) {
          sessionStorage.categoriesArray = JSON.stringify(data.categoriesArray);
        }

        if (data.cueToStart) {
          sessionStorage.teacherJudgesResponses = JSON.stringify(
            data.teacherJudgesResponses
          );

          beginGame(
            JSON.parse(sessionStorage.categoriesArray),
            socket,
            data.className,
            data.gameName
          );
        }

        //! ----------------------------- Gameplay Listeners --------------------------------

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

              document.getElementById("promptResponseWindow").append(buzzInBtn);
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

        if (data.banList) {
          console.log("banList: ", data.banList);
          if (data.banList.includes(sessionStorage.email)) {
            alert("I've been banned!");
            logOut(socket);
          }
        }

        if (data.endGame) {
          logOut(socket);
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

function handleTeacherListSelectionChange() {
  console.log("changed");
  const storedTeacherInformation = JSON.parse(sessionStorage.teacherEmails);

  for (let i = 0; i < storedTeacherInformation.length; i++) {
    if (storedTeacherInformation[i].teacherEmail === teacherList.value) {
      document.getElementById("classList").innerText =
        storedTeacherInformation[i].className;
      return;
    } else {
      document.getElementById("classList").innerText = "";
    }
    // console.log("changed...");

    socket.send(
      JSON.stringify({
        changedTeacherList: true,
        teacherEmail: teacherList[i].value,
        studentName: sessionStorage.studentName,
        studentID: sessionStorage.studentID,
        className: storedTeacherInformation[i].className,
      })
    );
  }
}
