require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const PORT = process.env.PORT;

const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client connected");
  ws.send("Welcome new client");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
        wss.clients.forEach(function each(client) {
          if(client !== ws && client.readyState === WebSocket.OPEN) {
              client.send("" + message)
          }
      })
  });
});

const bodyParser = require("body-parser");

// ---------------------- Controllers: -------------------
const user = require("./controllers/user.controller");
const questionAndAnswer = require("./controllers/questionAndAnswer.controller")


const cors = require("cors");
const mongoose = require("mongoose");
const MONGO = process.env.MONGODB;

mongoose.connect(
  `${MONGO}/new-jeopardy`,
);

const db = mongoose.connection;

db.once("open", () => console.log(`Connected: ${MONGO}`));

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const requireValidation = require("./middleware/validate-session");


// ----------------------- Endpoints -------------------
app.use("/api/new-jeopardy/user", user);

app.use(requireValidation)
app.use("/api/new-jeopardy/questionAndAnswer",questionAndAnswer)


app.get("/", (req, res) => {
  res.send("it's ALIVE");
});


// Changed from app.listen to server.listen when implementing websocket
app.listen(PORT, () =>
  console.log(`The jeopardyServer is running on Port: ${PORT}`)
);
