const {ObjectID} = require('mongodb'),
       express = require('express'),
       bodyParser = require('body-parser'),
       connect = require('./db/connect');

var app = express();

app.use(bodyParser.json());


connect.then((client) => {
    const db = client.db('TodoApp');

    app.post('/todos', (req, res) => {
        db.collection('Todos').insertOne({
            text: req.body.text
        }).then((result) => {
            res.send(result.ops);
            console.log(`New todo "${result.ops[0].text}" is created`);
        }).catch((e) => {
            console.log('Unable to create new todo', e.message);
            res.send('Ups!', e.message);
        });
    });

    app.get('/todos', (req, res) => {
        db.collection('Todos').find().toArray((err, docs) => {
            res.send({
                docs
            });
        });
    });

    app.get('/todos/:id', (req, res) => {

        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(400).send('Incorrect ID, what the fuck, dude ?!?');
        }

        db.collection('Todos').findOne({
            _id: new ObjectID(id)
        }).then((doc) => {
            res.send(doc);
        }).catch((e) => {
            res.status(400).send('UPS my friend!', e.message);
        });
    });

}).catch((e) => {
    console.log('Unable to connect to MongoDB server');
});


app.listen(3000, () => {
    console.log('Server is up');    
});








    // db.createCollection('Todos', {
    //     validator: {
    //         $jsonSchema: {
    //             bsonType: 'object',
    //             required: ['text'],
    //             properties: {
    //                 text: {
    //                     bsonType: 'string',
    //                 },
    //                 completed: {
    //                     bsonType: 'bool'
    //                 },
    //                 completedAt: {
    //                     bsonType: 'int'
    //                 }
    //             }
    //         }
    //     }
    // }).then((collection) => {
    //     collection.insertOne({
    //         text: '7',
    //         completed: true
    //     }).then((res) => {
    //         console.log(res.ops);
    //         client.close(() => {
    //             console.log('Connection closed!');
    //         });
    //     }).catch((e) => {
    //         console.log('****** UPS!!!', e.message);
    //         client.close(() => {
    //             console.log('Connection closed!');
    //         });
    //     });
    // });
