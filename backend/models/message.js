const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Message', messageSchema)