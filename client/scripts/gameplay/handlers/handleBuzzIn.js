export function handleBuzzIn(activePrompt, activeResponse, socket, score) {
  // console.log("buzzing in");

  socket.send(JSON.stringify({ buzzIn: sessionStorage.email }));

  const responseInputRow = document.createElement("div");
  responseInputRow.id = "responseInputRow";

  const responseInputField = document.createElement("input");
  responseInputField.id = "responseInputField";
  responseInputField.placeholder = "type response";

  const responseBtn = document.createElement("button");
  responseBtn.innerText = "Submit";
  responseBtn.addEventListener("click", () => {
    if (
      responseInputField.value === null ||
      responseInputField.value.length === 0
    ) {
      return;
    }

    if (checkResponseToPrompt(responseInputField.value)) {
      console.log("correct");
      socket.send(
        JSON.stringify({
          correctAnswer: responseInputField.value,
          playerName: sessionStorage.email,
          score: score
        })
      );

      socket.send(JSON.stringify({playCorrectSound: true}))
    } else {
      console.log("incorrect");
      document.getElementById("studentAnswering").innerText = "";
      document.getElementById("responseInputRow")?.remove();

      socket.send(
        JSON.stringify({
          incorrectAnswer: responseInputField.value,
          playerName: sessionStorage.email,
          activePrompt: activePrompt,
          activeResponse: activeResponse,
          score: score,
        })
      );
      socket.send(JSON.stringify({playIncorrectSound: true}))
    }
  });

  responseInputRow.append(responseInputField, responseBtn);
  responseInputField.focus();

  document.getElementById("promptResponseWindow").append(responseInputRow);

  //! ----------------- Functions -----------------------------------------------

  function checkResponseToPrompt(input) {
    let prompt = "";
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== " ") {
        prompt += input[i].toUpperCase();
      }
    }

    let response = "";
    for (let i = 0; i < activeResponse.length; i++) {
      if (activeResponse[i] !== " ") {
        response += activeResponse[i].toUpperCase();
      }
    }

    if (prompt === response) {
      return true;
    } else {
      return false;
    }
  }
}
