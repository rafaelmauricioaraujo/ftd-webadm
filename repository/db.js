var mongoClient = require('mongodb').MongoClient;

mongoClient.connect("mongodb://bluelab4:Bluelab.04@ds.151994.mlab.com:51994/prefeitura")
.then(conn => global.conn = conn.db('prefeitura'))
.catch(err => console.log(err));

function findAll(callback){
    global.conn.collection('servicos_web_admin').find({}).toArray(callback);
}

module.exports = { findAll }
