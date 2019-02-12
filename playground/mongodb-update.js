const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to fetch error')
    }
    console.log('connected to the database')
    const db = client.db('TodoApp')
    db.collection('Users').findOneAndUpdate({ _id: new ObjectID("5c5c0139012ae41c6c66ad47") },{
        $set:{
            name:'Sunu'
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    })
})