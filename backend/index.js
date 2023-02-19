require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./models/mongo_init')
const Message = require('./models/message')
const User = require('./models/user')
const { request, response, json } = require('express')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({
  projectId: 'Lostintranslation-378218',
  key: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

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

app.get('/getAll/:language', async (request, response) => {
  // Call DB using the "Message" endpoint defined above
  // retrieve all messages from DB 
  // call Google Translate API on every message retrieved to get translated messages
  // send all translated messages as response
  // 
  // YOUR CODE HERE
  await Message.find({}).then(async result => {
    console.log('res', result)
    const translatedMessages = []

    await Promise.all(
      result.map(async message => {
        const translateText = async () => {
          let [translations] = await translate.translate(message.message, request.params.language)
          translations = Array.isArray(translations) ? translations : [translations]
          console.log("Translations:")
          translations.forEach((translation, i) => {
            translatedMessages.push({
              "name" : message.name,
              "language" : message.language,
              "message" : translation,
              "time" : message.time
            })
            console.log(translatedMessages)
          })
        }
        await translateText();
      })
    )
    await response.send(translatedMessages) 
  })
})

app.post('/addMessage', async (request, response) => {
  // Call DB using the "Message" endpoint defined above
  // save the new message onto DB
  // call the socketIO server
  // send the new message to the socketIO server
  // return confirmation of success or failure
  //
  // YOUR CODE HERE

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const message = new Message({
    name: "Kevin",
    language: "de",
    message: "Ich bin ein Mann.",
    time: time
  })

  message.save().then(console.log("message saved"))

  response.send(message)

  // var today = new Date();
  // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // try {
  //   console.log(request.body)
  //   const user = await Message.create({
  //     name: request.body.name,
  //     language: request.body.language,
  //     message: request.body.message,
  //     time: time
  //   });
  //   return response.json({ status: true })
  // }
  // catch (ex) {
  //   next(ex)
  // }
})

app.get('/getAllUsers', (request, response) => {
  User.find({}).then(users => response.json(users))
})

app.post('/addUser', (request, response) => {
  const user = User({
    name: request.body.name,
    language: request.body.language
  })
  User.save().then(saved => response.json(saved))
})

app.delete('/removeUser/:id', (request, response) => {
  User.findByIdAndRemove(request.params.id)
  .then(() => response.status(204).end())
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
