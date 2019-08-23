var mongoClient = require('mongodb').MongoClient;

mongoClient.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(conn => global.conn = conn.db(process.env.DB))
.catch(err => console.log(err));

function findAll(callback){
    global.conn.collection(process.env.WCOLL).find({}).toArray(callback);
}

function insertOne(entidades, callback){
    global.conn.collection(process.env.WCOLL.insertOne(entidades, callback));
}
module.exports = { findAll, insertOne }
