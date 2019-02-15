const expect = require('expect')
const request = require('supertest')
const { Todo } = require('./../models/todo')
const { app } = require('./../server')

const todos = [{
    text: "Hello World!",
}, {
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