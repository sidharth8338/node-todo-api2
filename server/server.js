const express = require('express')
const bodyParser = require('body-parser')
const { Todo } = require('./models/todo')
const { mongoose } = require('./db/mongoose')
const { ObjectID } = require('mongodb')
const _ = require('lodash')


const app = express()
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    const todos = new Todo({
        text: req.body.text,
        completed: req.body.completed
    })
    todos.save()
        .then((todo) => {
            res.send(todo)
        })
        .catch((e) => res.status(400).send())
})

app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({ todos })
        })
        .catch((e) => {
            res.status(400).send()
        })
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(400).send()
    }
    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                return res.status(400).send()
            }
            res.send(todo)
        })
        .catch((e) => {
            res.status(404).send()
        })
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(400).send()
    }
    Todo.findByIdAndDelete(id)
        .then((todo) => {
            if (!todo) {
                return res.status(400).send()
            }
            res.send(todo)
        })
        .catch((e) => {
            res.status(404).send()
        })
})

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id
    const body = _.pick(req.body, ['completed', 'text'])
    if (!ObjectID.isValid(id)) {
        return res.status(400).send()
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        console.log(body)
        body.completedAt = null
        body.completed = false
    }
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo) {
                return res.status(400).send()
            }
            res.send(todo)
        })
        .catch((e) => {
            res.status(404).send()
        })
})

app.listen(3000, () => {
    console.log('App is started at port 3000')
})