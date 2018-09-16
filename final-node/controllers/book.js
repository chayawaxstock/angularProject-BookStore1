const { Book } = require('./../models/book');

let init = (app) => {

    // Get books - ALL - EVERY CLIENT CAN ACCESS: 
    app.get("/api/book", (request, response) => {
        Book.find({})
            .then(res => {
                response.status(200)
                response.send(JSON.stringify({ items: res }));
            })
            .catch(() => { response.status(400).send() });
    });

    // Get books - BY BOOK NAME - EVERY CLIENT CAN ACCESS: 
    app.get("/api/book/name/:q", (request, response) => {
        Book.find({ "volumeInfo.title": new RegExp(request.params.q, 'i') })
            .then(res => {
                response.status(200);
                response.send(JSON.stringify({ items: res }));
            })
            .catch(() => { response.status(400).send() });
    });

    // Get books - BY BOOK ID - EVERY CLIENT CAN ACCESS: 
    app.get("/api/book/id/:q", (request, response) => {
        Book.findById(request.params.q)
            .then(res => {
                response.status(200);
                response.send(JSON.stringify(res));
            })
            .catch((e) => { response.status(400).send(e) });
    });

}

module.exports = { init }
