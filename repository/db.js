
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

mongoClient.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(conn => global.conn = conn.db(process.env.DB))
.catch(err => console.log(err));

function findAll(callback){
    global.conn.collection(process.env.COLL).find({}).toArray(callback);
}

function insertOne(servico, callback){
    global.conn.collection(process.env.COLL).insertOne(servico, callback);
}

function findOne(id, callback){
    global.conn.collection(process.env.COLL).find(new ObjectId(id)).toArray(callback);
}

function update(id, servico, callback){
    global.conn.collection(process.env.COLL).update({_id:new ObjectId(id)}, servico, callback);
}

function deleteOne(id, callback){
    global.conn.collection(process.env.COLL).deleteOne({_id:new ObjectId(id)}, callback);
}

module.exports = { findAll, insertOne, findOne, update }
