// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect with the database')
    }
    console.log('connected successfully')
    const db = client.db('TodoApp')
    // db.collection('Users').insertOne({
    //     name: "sidharth",
    //     age: 20,
    //     location: "bhubaneswar"
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to collect data', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })
    db.collection('Users').find({ _id: new ObjectID('5c5c083cd2f4bf1f18b9f52c') }).toArray().then((res) => {
        console.log(JSON.stringify(res, undefined, 2))
    }, (err) => {
        console.log(err)
    })

    client.close()
})