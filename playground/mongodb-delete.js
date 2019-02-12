const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable t fetch database')
    }
    console.log("Connected to Database")
    const db = client.db('TodoApp')
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("5c5c083cd2f4bf1f18b9f52c")
    }).then((result) => {
        console.log(result)
    })

})