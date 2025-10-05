export const sendCategoriesArray = (categoriesArray, ws, client) => {

    ws.send(JSON.stringify({ message: "your categoriesArray has been received" }));
                
    // client.send(JSON.stringify({ message: "teacherEmail:" }));
    client.send(JSON.stringify({ categoriesArray: categoriesArray}))
}