const { sendStudentEmail } = require("./sendStudentEmail");
const { sendTeacherEmail } = require("./sendTeacherEmail");

const openNewWebsocket = (server) => {
  const WebSocket = require("ws");
  const wss = new WebSocket.Server({ server: server });

  wss.on("connection", function connection(ws) {

    ws.on("error", console.error);

    ws.on("message", function message(data) {

      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          // client.send(JSON.stringify({ "data: ": "Hello" }));
          const info = JSON.parse(data);

          if (info.teacherEmail) {
            sendTeacherEmail(info.teacherEmail, ws, client)
          }

          if (info.studentEmail) {
            sendStudentEmail(info.studentEmail, ws, client)
          }

          if (info.requestingGameInfo) {
            ws.send("info request received");
            client.send("info request received");
          }

          if (info.buzzIn) {
            ws.send("buzzin received");
            client.send("buzzIn received");
          }

          if (info.startGame) {
            ws.send("startgame received");
            client.send("startGame received");
          }
        }
      });
    });
  });
};

module.exports = openNewWebsocket;
