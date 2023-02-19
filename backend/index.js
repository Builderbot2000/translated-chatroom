require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Message = require('./models/message')
const { request, response } = require('express')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

let notes = [
  {
    name: 'Bob',
    message: 'Holla!'
  },
  {
    name: 'Alice',
    message: 'How are you?'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/getAll', (request, response) => {
  // Call DB using the "Message" endpoint defined above
  // retrieve all messages from DB 
  // call Google Translate API on every message retrieved to get translated messages
  // send all translated messages as response
  // 
  // YOUR CODE HERE
  response.json(notes)
})

app.get('/addMessage', (request, response) => {
  // Call DB using the "Message" endpoint defined above
  // save the new message onto DB
  // call the socketIO server
  // send the new message to the socketIO server
  // return confirmation of success or failure
  // YOUR CODE HERE
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})