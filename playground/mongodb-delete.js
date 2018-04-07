const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
    }

    console.log('Connect to MongoDB server');
    
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndDelete({
        complite: false
    }).then((result) => {
        console.log(result);
    });

});