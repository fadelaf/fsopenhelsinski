require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/phone')
const { default: mongoose } = require('mongoose')

// Buat token baru bernama 'postdata'
morgan.token('postdata', (req, res) => {
  // Hanya tampilkan body untuk POST/PUT/PATCH
  if (req.method === 'POST' ) {
    return JSON.stringify(req.body)
  }
  return '-'
})

// Pakai token di format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)



let persons = [
  
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }

]


let countInform = 0

app.get('/', (request, response) => {
    response.json('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    countInform += 1
    Person.find({}).then(person => {
      response.json(person)
      // mongoose.connection.close()
    })
})

app.get('/api/persons/:id', (request, response) => {

    /* previous excercise */
    const id = request.params.id
    // console.log(id)
    // const person = persons.find(person => person.id === id)
    // console.log(person)

    // if(person){
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }

    // Mongo DB exercise

    Person.findById({id})
      .then(person => {
        response.json(person)
      })

})

app.get('/info', (request, response) => {

    const date = new Date()
    response.send(`<div>Phonebook has info for ${countInform} people<div>
        <div>${date}</div>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
      .then(deletedPerson => {
        if(!deletedPerson) {
          return response.status(404).json({
            error: `Person with id ${id} not found`
          })
        }

        response.status(204).end()
      })
      .catch(err => {
        console.log(err)
        response.status(400).json({error: 'something wrong'})
      })
      
})

// app.put('/api/persons/:id', (request, response) => {
//     const {content, important } = request.body
//     const id = request.params.id 

// })


const generateId = () => {
    const generate = () => (Math.floor((Math.random() * 100) + 1))
    let id = generate()
    
    let findDuplicate = (currentId) => (persons.find(person => person.id === String(currentId)))


    while (findDuplicate(id)) {
        id = generate()
    }

    return String(id)

}

app.post('/api/persons', (request, response) => {

    const {name, number} = request.body

    if (!name || !number) {
      return response.status(400).json({
        error: 'name/number missing'
      })
    }

    Person.findOne({name: name})
    .then(existingPerson => {
      if(existingPerson){
          return response.status(400).json({
            error: 'name already exists'
          })
      }


      const person =  new Person({
        name: name,
        number: number
      })

      person.save().then(savedPerson => {
        response.json(savedPerson)
      })

    })
  

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})