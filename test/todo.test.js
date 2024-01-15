const request = require('supertest')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Todo = require('../models/todo')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Suite for routes', () => {
    test('should create a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .send({
                title: 'Test todo',
                description: 'Test todo description',
                completed: false
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toEqual('Test todo')
        expect(res.body.description).toEqual('Test todo description')
        expect(res.body.completed).toEqual(false)
    })

    test('should get all todos', async () => {
        const res = await request(app)
            .get('/todos')
        expect(res.statusCode).toEqual(200)
        expect(res.body.todos.length).toEqual(1)
    })

    test('should get a todo', async () => {
        const todo = await Todo.findOne({ title: 'Test todo' })
        const res = await request(app)
            .get(`/todos/${todo._id}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toEqual('Test todo')
        expect(res.body.description).toEqual('Test todo description')
        expect(res.body.completed).toEqual(false)
    })

    test('should update a todo', async () => {
        const todo = await Todo.findOne({ title: 'Test todo' })
        const res = await request(app)
            .put(`/todos/${todo._id}`)
            .send({
                title: 'Updated todo',
                description: 'Updated todo description',
                completed: true
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toEqual('Updated todo')
        expect(res.body.description).toEqual('Updated todo description')
        expect(res.body.completed).toEqual(true)
    })

    test('should delete a todo', async () => {
        const todo = await Todo.findOne({ title: 'Updated todo' })
        const res = await request(app)
            .delete(`/todos/${todo._id}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual('Todo deleted successfully')
    })
})