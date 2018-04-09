const {MongoClient} = require('mongodb');


module.exports = MongoClient.connect('mongodb://localhost:27017');
