require('dotenv').config()
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=>{
    console.log("DB Connection Sucessful")
}).catch((err)=>{
    console.log(err.message)
});
const express = require('express')
const cors = require('cors')
const Message = require('./models/message')
const { request, response, json } = require('express')

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

app.get('/getAll', async(request, response) => {
  // Call DB using the "Message" endpoint defined above
  // retrieve all messages from DB 
  // call Google Translate API on every message retrieved to get translated messages
  // send all translated messages as response
  // 
  // YOUR CODE HERE
  try {
    Message.find({}, function(err, messages) {
           response.json({messages: messages});
        });
  } catch (ex) {
    next(ex);
  }
})

app.post('/addMessage', async(request, response) => {
  // Call DB using the "Message" endpoint defined above
  // save the new message onto DB
  // call the socketIO server
  // send the new message to the socketIO server
  // return confirmation of success or failure
  // YOUR CODE HERE
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  try{    
    const user =await Message.create({
      name: request.body.name,
      language:request.body.language ,
      message: request.body.message,
      time: time
    });
    return response.json({status:true})
}
catch(ex){
    next(ex)
}
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
