const { sendStudentEmail } = require("./sendStudentEmail");
const { sendTeacherEmail } = require("./sendTeacherEmail");
const { sendClassName } = require("./sendClassName");
const {sendCategoriesArray} = require("./sendCategoriesArray")

const openNewWebsocket = (server) => {
  const WebSocket = require("ws");
  const wss = new WebSocket.Server({ server: server });

  wss.on("connection", function connection(ws) {

    ws.on("error", console.error);

    ws.on("message", function message(data) {

      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({"WelcomeMessage": "WelcomeMessage"}))
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ "data: ": "Hello" }));
          const info = JSON.parse(data);

          if (info.teacherEmail) {
            sendTeacherEmail(info.teacherEmail, ws, client)
          }

          if (info.studentEmail) {
            sendStudentEmail(info.studentEmail, ws, client)
          }

          if (info.className) {
            sendClassName(info.className, ws, client)
          }

          if (info.categoriesArray) {
            sendCategoriesArray(info.categoriesArray, ws, client)
          }

          if (info.squareClicked) {
            console.log("clicked square: ",info.squareClicked)
            ws.send(JSON.stringify({squareClicked: info.squareClicked}))
            client.send(JSON.stringify({squareClicked: info.squareClicked}))
          }

          // if (info.activePrompt) {
          //   ws.send(JSON.stringify({activePrompt: info.activePrompt}))
          //   client.send(JSON.stringify({activePrompt: info.activePrompt}))
          // }

          // if (info.activeResponse) {
          //     ws.send(JSON.stringify({activeResponse: info.activeResponse}))
          //   client.send(JSON.stringify({activeResponse: info.activeResponse}))
          // }

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
            client.send(JSON.stringify(info))
            ws.send(JSON.stringify(info))
          }

          if (info.incorrectAnswer) {
            client.send(JSON.stringify(info))
            ws.send(JSON.stringify(info))
          }

          if (info.showResponse) {
            console.log("info: ",info)
            client.send(JSON.stringify(info))
            ws.send(JSON.stringify(info))
          }
        }
      });

      // if (JSON.parse(data).squareClicked) {
      //   ws.send(JSON.stringify(data))
      // }
    });
  });
};

module.exports = openNewWebsocket;
