export const sendTeacherEmail = (teacherEmail, ws, client) => {

    ws.send(JSON.stringify({ message: "your teacherEmail has been received" }));
                
    // client.send(JSON.stringify({ message: "teacherEmail:" }));
    client.send(JSON.stringify({ teacherEmail: teacherEmail}))
}