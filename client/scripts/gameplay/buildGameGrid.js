export function buildGameGrid(categoriesArray, socket) {
  console.log("categoriesArray: ", categoriesArray);
  const gameGrid = document.createElement("div");
  gameGrid.id = "gameGrid";

  const categoryLength = categoriesArray.length;

  gameGrid.style.gridTemplateColumns = `repeat(${categoryLength}, 1fr)`;
  gameGrid.style.gridTemplateRows = `2rem repeat(${categoriesArray[0].prompts.length}, 1fr)`;

  console.log(categoriesArray[0].category);
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
        console.log(categoriesArray[i].category)
        socket.send(
          JSON.stringify({
            squareClicked: {
              gameSquare: `gameSquare${i}_${j}`,
              activePrompt: categoriesArray[i].prompts[j],
              activeResponse: categoriesArray[i].responses[j],
              activeCategory: categoriesArray[i].category
            },
          })
        );
      });
      gameGrid.append(gameSquare);
    }
  }

  document.getElementById("gameWindow").append(gameGrid);
}
