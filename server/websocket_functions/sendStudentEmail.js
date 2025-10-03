export const sendStudentEmail = (studentEmail, ws, client) => {

        // ws.send(JSON.stringify({ message: "your studentEmail has been received" }));
                
        // client.send(JSON.stringify({ message: "studentEmail:" }));
            client.send(JSON.stringify({ studentEmail: studentEmail}))
}