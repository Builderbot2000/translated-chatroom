const express = require('express')
const app = express()

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
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})