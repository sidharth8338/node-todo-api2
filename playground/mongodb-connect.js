const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect with the database')
    }
    console.log('connected successfully')
    const db = client.db('TodoApp')
    db.collection('Users').insertOne({
        name: "sidharth",
        age: 20,
        location: "bhubaneswar"
    }, (err, result) => {
        if (err) {
            return console.log('Unable to collect data', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    })

    client.close()
})