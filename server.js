require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('open', () => {
  console.log('Database connected!')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})