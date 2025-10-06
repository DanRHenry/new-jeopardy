export function buildGameGrid(categoriesArray, socket) {
  // console.log("categoriesArray: ", categoriesArray);
  const gameGrid = document.createElement("div");
  gameGrid.id = "gameGrid";

  const categoryLength = categoriesArray.length;

  gameGrid.style.gridTemplateColumns = `repeat(${categoryLength}, 1fr)`;
  gameGrid.style.gridTemplateRows = `2rem repeat(${categoriesArray[0].prompts.length}, 1fr)`;

  if (sessionStorage.role === "student") {
    gameGrid.style.height = "80vh";
    gameGrid.style.width = "80vw";
  } else if (sessionStorage.role === "teacher") {
    // gameGrid.style.height = "100%";
    // gameGrid.style.width = "100%";
  }

  // console.log(categoriesArray[0].category);
  for (let i = 0; i < categoriesArray.length; i++) {
    const categorySquare = document.createElement("div");
    categorySquare.className = "categorySquares";
    categorySquare.id = `gameSquareCategory${i}`;
    categorySquare.innerText = categoriesArray[i].category;
    gameGrid.append(categorySquare);
  }

  for (let i = 0; i < categoryLength; i++) {
    for (let j = 0; j < categoriesArray[i].prompts.length; j++) {
      const gameSquare = document.createElement("div");
      gameSquare.className = "gameSquares";
      gameSquare.id = `gameSquare${i}_${j}`;
      gameSquare.innerText = (i + 1) * 200;
      gameSquare.addEventListener("click", () => {
        // console.log(categoriesArray[i].category);
        socket.send(
          JSON.stringify({
            squareClicked: {
              gameSquare: `gameSquare${i}_${j}`,
              activePrompt: categoriesArray[i].prompts[j],
              activeResponse: categoriesArray[i].responses[j],
              activeCategory: categoriesArray[i].category,
            },
          })
        );
      });
      gameGrid.append(gameSquare);
    }
  }

  if (sessionStorage.role === "teacher") {
    const borderGrid = document.createElement("div");
    borderGrid.id = "borderGrid";
    const players = JSON.parse(sessionStorage.studentList);

    for (let i = 0; i < players.length + (28 - players.length); i++) {
      const playerBox = document.createElement("div");
      playerBox.id = `playerBox_${i}`;
      playerBox.className = "playerBoxes";
      borderGrid.append(playerBox);
    }
    borderGrid.append(gameGrid);
    document.getElementById("gameWindow").append(borderGrid);

    for (let i = 0; i < players.length; i++) {
      const playerBoxes = document.getElementsByClassName("playerBoxes");

      if (players.length <= playerBoxes.length) {
        const playerName = document.createElement("div");
        playerName.innerText = players[i];
        playerName.className = "playerNames";
        const playerScore = document.createElement("div");
        playerScore.innerText = "0";
        playerScore.id = `playerScore${i}`;
        playerScore.className = "playerScores";

        playerBoxes[i].append(playerName, playerScore);
      }
    }

    for (let i = 0; i < document.getElementsByClassName("playerBoxes").length; i++) {
      // console.log('playerbox', i)
      if (document.getElementsByClassName("playerNames")[i]?.innerText.length > 0) {
        // document.getElementsByClassName("playerNames")[i].style.color = "blue"
      }
    }
  } else {
    document.getElementById("gameWindow").append(gameGrid);
  }
}
