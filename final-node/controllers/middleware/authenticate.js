const jwt = require('jsonwebtoken');
const { Client } = require('./../../models/client');

var authenticate = (req, res, next) => {
  let token = req.header('xx-auth');
  let decoded = jwt.verify(token.toString(), 'my secret');
 
  return Client.findOne({
    '_id': decoded._id
  }).then((client)=>{
    req.client = client;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
