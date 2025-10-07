const sendCategoriesArray = (categoriesArray, ws, client) => {

    ws.send(JSON.stringify({ message: "your categoriesArray has been received" }));
                
    client.send(JSON.stringify({ categoriesArray: categoriesArray}))
}
module.exports = sendCategoriesArray;
