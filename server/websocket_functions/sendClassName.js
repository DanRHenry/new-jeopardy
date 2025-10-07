const sendClassName = (className, ws, client) => {

    ws.send(JSON.stringify({ message: "the className has been received" }));
                
    client.send(JSON.stringify({ className: className}))
}

module.exports = sendClassName;
