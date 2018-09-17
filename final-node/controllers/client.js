const jwt = require('jsonwebtoken');
const { Client } = require('./../models/client');

let init = (app) => {
    // Add client - REGISTER: 
    app.post("/api/client", (request, response) => {
        console.log(request.body);
        let client = new Client(request.body);
        client.save()
            .then((newDoc) => {
               console.log("bhcvv b");
                let token=jwt.sign({id: newDoc._id}, 'my secret')
                response.header('xx-auth', token);
                response.status(201).send(newDoc);
            })
            .catch((e) => {
                response.status(400).send(e);
            });
    });

    // Get client -LOGIN: 
    app.get("/api/client", (request, response) => {
        let loginData = request.header('xx-auth');
        if (loginData) {
            return Client.findOne({
                "password": loginData.substring(0, 64),
                "userName": loginData.substring(64, loginData.length)
            }).then((client) => {
                let token=jwt.sign({id: client._id}, 'my secret')
                response.header('xx-auth', token);
                response.status(200)
                .send(JSON.stringify({"status":"login success"}));
            })
                .catch((e) => {
                    response.status(401).send();
                });
        }
        else {
            response.status(401).send();
        }
    });
}

module.exports = { init }
