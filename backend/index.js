require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Message = require('./models/message')
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

  await Message.find({}).then(result => {
    const translatedMessages = []

    result.forEach(element => {
      const text = element.message
      const target = request.params.language

      const translateText = async () => {
        let [translations] = await translate.translate(text, target)
        translations = Array.isArray(translations) ? translations : [translations]
        console.log("Translations:")
        translations.forEach((translation, i) => {
          translatedMessages.push({
            "name" : element.name,
            "language" : element.language,
            "message" : translation,
            "time" : element.time
          })
          console.log(translatedMessages)
        })
      }

      translateText();
    })
    response.send(translatedMessages) 
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
    name: "Victor",
    language: "en",
    message: "Hello!",
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
