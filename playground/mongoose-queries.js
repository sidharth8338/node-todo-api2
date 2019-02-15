const { mongoose } = require('./../server/db/mongoose')
const { Users } = require('./../server/models/Users')


const id = "5c5e50898e3b243560b27b06"

Users.findById(id).then((todo) => {
    if (!todo) {
        return console.log('invalid id')
    }
    console.log(todo)
}).catch((e) => {
    console.log('hahahahaha', e)
})