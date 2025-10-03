require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT;

const openWebsocket = require("./websocket_functions/openNewWebsocket")

openWebsocket(server)

const bodyParser = require("body-parser");

// ---------------------- Controllers: -------------------
const user = require("./controllers/user.controller");
const questionAndAnswer = require("./controllers/questionAndAnswer.controller");
const category = require("./controllers/category.controller");
const games = require("./controllers/games.controller");

const cors = require("cors");
const mongoose = require("mongoose");
const MONGO = process.env.MONGODB;

mongoose.connect(`${MONGO}/new-jeopardy`);

const db = mongoose.connection;

db.once("open", () => console.log(`Connected: ${MONGO}`));

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const requireValidation = require("./middleware/validate-session");
// const openNewWebsocket = require("./websocket_functions/openNewWebsocket");

// ----------------------- Endpoints -------------------
app.use("/api/new-jeopardy/user", user);

app.use(requireValidation);
app.use("/api/new-jeopardy/questionAndAnswer", questionAndAnswer);
app.use("/api/new-jeopardy/category", category);
app.use("/api/new-jeopardy/games", games);

app.get("/", (req, res) => {
  res.send("it's ALIVE");
});

// Changed from app.listen to server.listen when implementing websocket
server.listen(PORT, () =>
  console.log(`The jeopardyServer is running on Port: ${PORT}`)
);
