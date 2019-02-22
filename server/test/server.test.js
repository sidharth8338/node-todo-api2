const expect = require('expect')
const request = require('supertest')
const { Todo } = require('./../models/todo')
const { app } = require('./../server')
const { ObjectID } = require('mongodb')


const todos = [{
    _id: new ObjectID(),
    text: "Hello World!",
}, {
    _id: new ObjectID(),
    text: "Text to add todo"
}]
beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        Todo.insertMany(todos)
    }).then(() => done())
})

describe('POST /todos', () => {
    it('should create a todo', (done) => {
        const text = 'text for todo'

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch((e) => done(e))
            })
    })
    it("should not create a todo", (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e) => done(e))
            })
    })
})

describe('GET /todos', () => {
    it('Should get todo', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)

    })
})

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(todos[0].text)
            })
            .end(done)
    })
    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done)
    })
    it('should return 404 if id is invalid', (done) => {
        request(app)
            .get('/todos/112314')
            .expect(404)
            .end(done)
    })
})

describe("DELETE /todos/id", () => {
    it('should delete a todo', (done) => {
        const toHex = todos[0]._id.toHexString()
        request(app)
            .delete(`/todos/${toHex}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(todos[0].text)
            })
            .end(done)
    })
})