const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server', err);
    }

    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        complite: false
    }, (err, result) => {
        if (err) {
            console.log('Some error here:', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    

    db.collection('Users').insertOne({
        name: 'Daniel',
        age: 31,
        location: 'Russia'
    }, (err, result) => {
        if (err) {
            console.log('Unable to insert new user record', err);
        }

        console.log(result.ops[0]._id.getTimestamp());
    });

    client.close();
});


