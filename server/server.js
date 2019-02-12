const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Users } = require('./models/Users')
const { Todo } = require('./models/todo')

let app = express()
app.use(bodyParser.json())
app.post('/todos', (req, res) => {
    let newTodo = new Todo({
        text: req.body.text
    })
    newTodo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(404).send(e)
    })
})

app.listen(3000, () => {
    console.log('started at port 3000')
})

module.exports = { app }