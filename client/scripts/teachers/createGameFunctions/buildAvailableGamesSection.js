export async function buildAvailableGamesSection() {
    const availableGamesSection = document.createElement("div")
    availableGamesSection.id = "availableGamesSection"

    const availableGamesSectionHeader = document.createElement("div")
    availableGamesSectionHeader.id = "availableGamesSectionHeader"
    availableGamesSectionHeader.innerText = "Available Games:"


    availableGamesSection.append(availableGamesSectionHeader)

    document.getElementById("createGameContentSection").append(availableGamesSection)
}