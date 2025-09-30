const router = require("express").Router();
const Games = require("../models/games.model");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

router.get("/", async (req, res) => {
  try {
    console.log("getting all games");
    const games = await Games.find();

    console.log("games: ", games);

    games
      ? res.status(200).json({
          message: "All Games Found",
          games,
        })
      : res.status(404).json({
          message: "No games found",
        });
  } catch (err) {
    serverError(res, err);
  }
});

router.post("/newGame", async (req, res) => {
  try {
    const { email, categoriesArray, className, gameName } = req.body;

    // console.log("categoriesArray: ",categoriesArray)

    const promptsAndResponses = categoriesArray;
    const newGameObject = new Games({
      email: email,
      promptsAndResponses: promptsAndResponses,
      className: className,
      gameName: gameName,
    });

    const existingGame = await Games.findOne(
      { gameName: gameName },
      { className: className },
      { email: email }
    );

    if (existingGame) {
      res.status(409).json({
        message: "existing game",
      });
    } else {
      const newGame = await newGameObject.save();

      if (newGame) {
        res.status(200).json({
          game: newGame,
          message: "game saved",
        });
      }
    }
  } catch (err) {
    serverError(res, err);
  }
});
module.exports = router;
