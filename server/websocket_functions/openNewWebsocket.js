const { sendStudentEmail } = require("./sendStudentEmail");
// import {sendStudentEmail} from "./sendStudentEmail.js";
// const { sendTeacherEmail } = require("./sendTeacherEmail");

const { sendTeacherEmail } = require("./sendTeacherEmail");
// import {sendTeacherEmail} from "./sendTeacherEmail.js";
const { sendClassName } = require("./sendClassName");
// import {sendClassName} from "./sendClassName.js";
const { sendCategoriesArray } = require("./sendCategoriesArray");
// import {sendCategoriesArray} from "./sendCategoriesArray.js";
const { randomUUID } = require('crypto');


const openNewWebsocket = (server) => {
  const WebSocket = require("ws");
  const wss = new WebSocket.Server({ server: server });

  wss.on("connection", function connection(ws) {
    ws.isAlive = true;
    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("error", console.error);

    /*     const interval = setInterval(() => {
      wss.clients.forEach((ws) => {
        // console.log("alivestatus: ",ws.isAlive)
        // if (ws.isAlive === false) {
        //   console.log("Terminating unresponsive client");
        //   ws.close()
        //   clearInterval(interval)
        //   return 
        // }

        // ws.isAlive = false;

        ws.ping()
      })
    }, 5000) */

    ws.on("message", function message(data) {
      if (JSON.parse(data).closeWebsocket) {
        // console.log("close websocket received")
        ws.send(JSON.stringify({ message: "terminating websocket" }));
        ws.close();
        // clearInterval(interval)
      }

      const info = JSON.parse(data);

      // console.log("(line 50)message: ", JSON.parse(data));

      if (info.studentIDRequest) {
        const randomID = randomUUID();
        console.log("id request received, sending reply")
        console.log(randomID)
        ws.send(JSON.stringify({studentIDResponse: randomID}))
      }

      wss.clients.forEach(function each(client) {
        // client.send(JSON.stringify({ WelcomeMessage: "WelcomeMessage" }));
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ "data: ": "Hello" }));
          const info = JSON.parse(data);

          // console.log("info received: ", info);

          if (info.studentID && info.studentName) {
            client.send(JSON.stringify(info))
            ws.send(JSON.stringify(info))
          }

          if (info.studentID && !info.changedTeacherList) {
            client.send(JSON.stringify({ info }));
            ws.send(JSON.stringify({ info }));
          }

          if (info.changedTeacherList) {
            client.send(JSON.stringify({ info }));
            ws.send(JSON.stringify({ info }));
          }

          if (info.teacherEmail && !info.studentID) {
            ws.send(
              JSON.stringify({ message: "your teacherEmail has been received" })
              // JSON.stringify({ teacherEmail: info.teacherEmail, className: info.className })
            );
            client.send(
              JSON.stringify({
                teacherEmail: info.teacherEmail,
                className: info.className,
              })
            );
          }

          if (info.removeTeacher) {
            client.send(JSON.stringify({ removeTeacher: info.removeTeacher }));
          }

          if (info.studentName) {
            console.log("student name received: ", info);
            client.send(
              JSON.stringify(info)
              // JSON.stringify({
              //   studentName: info.studentName,
              //   teacherEmail: info.teacherEmail,
              //   className: info.className,
              // })
            );
            // sendStudentEmail(info.studentEmail, ws, client);
          }

          if (info.className && !info.studentID) {
            ws.send(
              JSON.stringify({ message: "the className has been received" })
            );

            client.send(JSON.stringify({ className: info.className }));
            // sendClassName(info.className, ws, client);
          }

          if (info.categoriesArray) {
            ws.send(
              JSON.stringify({
                message: "your categoriesArray has been received",
              })
            );

            client.send(
              JSON.stringify({ categoriesArray: info.categoriesArray })
            );
            // sendCategoriesArray(info.categoriesArray, ws, client);
          }

          if (info.squareClicked) {
            // console.log("clicked square: ", info.squareClicked);
            ws.send(JSON.stringify({ squareClicked: info.squareClicked }));
            client.send(JSON.stringify({ squareClicked: info.squareClicked }));
          }

          if (info.requestingGameInfo) {
            ws.send("info request received");
            client.send("info request received");
          }

          if (info.buzzIn) {
            ws.send(JSON.stringify(info));
            client.send(JSON.stringify(info));
          }

          if (info.cueToStart) {
            client.send(JSON.stringify(info));
          }

          if (info.correctAnswer) {
            client.send(JSON.stringify(info));
            ws.send(JSON.stringify(info));
          }

          if (info.incorrectAnswer) {
            client.send(JSON.stringify(info));
            ws.send(JSON.stringify(info));
          }

          if (info.showResponse) {
            // console.log("info: ", info);
            client.send(JSON.stringify(info));
            ws.send(JSON.stringify(info));
          }

          if (info.playCorrectSound) {
            ws.send(JSON.stringify(info));
          }

          if (info.playIncorrectSound) {
            ws.send(JSON.stringify(info));
          }

          if (info.leaveGame) {
            console.log("leave game request received", info)
            ws.send(JSON.stringify(info));
            client.send(JSON.stringify(info));
          }

          if (info.banList) {
            // console.log("banlist: ",info.banList)
            client.send(JSON.stringify(info));
          }

          if (info.endGame) {
            client.send(JSON.stringify(info));
          }
        }
      });
    });
    wss.on("close", () => {
      // clearInterval(interval)
    });
  });
};

module.exports = openNewWebsocket;
