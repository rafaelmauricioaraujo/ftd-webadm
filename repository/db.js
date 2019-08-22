var mongoClient = require('mongodb').MongoClient;

mongoClient.connect("mongodb://bluelab4:Bluelab.04@ds.151994.mlab.com:51994/prefeitura")
.then(conn => global.conn = conn.db('prefeitura'))
.catch(err => console.log(err));

module.exports = { }
