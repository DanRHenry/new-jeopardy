export function logOut(socket) {
  if (sessionStorage.role === "student") {
    socket.send(
      JSON.stringify({
        leaveGame: true,
        studentName: sessionStorage.studentName,
        studentEmail: sessionStorage.email,
      })
    );
  }
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("teacherEmail");
  sessionStorage.removeItem("studentList");
  sessionStorage.removeItem("className");
  sessionStorage.removeItem("categoriesArray");
  sessionStorage.removeItem("studentList");
  sessionStorage.removeItem("studentName");
  sessionStorage.removeItem("className");
  sessionStorage.removeItem("categoriesArray");
  sessionStorage.removeItem("gameName");
  console.log("session storage items removed...");
  // logoutBtn.remove();
  // titleScreen();
  document.getElementById("enableSoundsBtn")?.remove();
  console.log("sending close socket");
  const closesocketobject = JSON.stringify({
    closeWebsocket: "true",
  });
  socket.send(JSON.stringify({ removeTeacher: true }));
  socket.send(JSON.stringify({
    endGame: true
  }))
  socket.send(closesocketobject);
  console.log("sent", closesocketobject);
  socket.close();
  window.location.reload();
}
