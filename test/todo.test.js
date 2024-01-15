const request = require('supertest')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Todo = require('../models/todo')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
let mongoServer