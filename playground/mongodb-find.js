const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
    }

    console.log('Connect to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Users').find({
        name: 'Daniel'
    }).toArray()
    .then((docs) => {
        console.log(docs);
    })
    .catch((e) => {
       console.log(e); 
    });

    client.close();

});

