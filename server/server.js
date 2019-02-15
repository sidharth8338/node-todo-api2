const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Users } = require('./models/Users')
const { Todo } = require('./models/todo')
const { ObjectID } = require('mongodb')

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })
    }, (e) => {
        res.status(404).send(e)
    })
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send({})
    }
    Users.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({})
        }
        res.send({ todo })
    }).catch((e) => res.status(400).send())
})

app.listen(3000, () => {
    console.log('started at port 3000')
})

module.exports = { app }