var mongoClient = require('mongodb').MongoClient;
var uri = "mongodb://queryUser:ftdigital1234@ds151994.mlab.com:51994/prefeitura";

mongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(conn => global.conn = conn.db('prefeitura'))
.catch(err => console.log(err));

function findAll(callback){
    global.conn.collection('servicos_web_admin').find({}).toArray(callback);
}

module.exports = { findAll }
