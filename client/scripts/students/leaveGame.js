export async function leaveGame(studentWebsocket) {

    console.log("socket state: ", studentWebsocket)
    console.log("leave game sent")
    studentWebsocket.close()
}