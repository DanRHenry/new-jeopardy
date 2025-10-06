export function buildPlayerScoreSection() {
    const playerScoreRow = document.createElement("div")
    playerScoreRow.id = "playerScoreRow"

    const playerScoreText = document.createElement("span")
    playerScoreText.id = "playerScoreText"
    playerScoreText.innerText = "Your Score: "

    const playerScoreDisplay = document.createElement("span")
    playerScoreDisplay.innerText = "0"

    playerScoreRow.append(playerScoreText, playerScoreDisplay)

    const rankRow = document.createElement("div")
    rankRow.id = "rankRow"

    const rankPrefix = document.createElement("span")
    rankPrefix.innerText = "Your Rank: "

    const rankNum = document.createElement("span")
    rankNum.id = "rankNum"
    rankNum.innerText = "1st"

    const rankText = document.createElement("span")
    rankText.innerText = " out of "

    const totalPlayers = document.createElement("span")
    totalPlayers.id = "totalPlayers"
    totalPlayers.innerText = "1"

    rankRow.append(rankPrefix, rankNum, rankText, totalPlayers)

    document.getElementById("playerScoreSection").append(playerScoreRow, rankRow)
}