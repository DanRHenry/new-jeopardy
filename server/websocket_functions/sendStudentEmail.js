const sendStudentEmail = (studentEmail, ws, client) => {
            client.send(JSON.stringify({ studentEmail: studentEmail}))
}

module.exports = sendStudentEmail;
