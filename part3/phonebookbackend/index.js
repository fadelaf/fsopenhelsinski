require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/phone')


// Buat token baru bernama 'postdata'
morgan.token('postdata', (req, res) => {
  // Hanya tampilkan body untuk POST/PUT/PATCH
  console.log(res)
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


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)



// let persons = [

//   {
//     'id': '1',
//     'name': 'Arto Hellas',
//     'number': '040-123456'
//   },
//   {
//     'id': '2',
//     'name': 'Ada Lovelace',
//     'number': '39-44-5323523'
//   },
//   {
//     'id': '3',
//     'name': 'Dan Abramov',
//     'number': '12-43-234345'
//   },
//   {
//     'id': '4',
//     'name': 'Mary Poppendieck',
//     'number': '39-23-6423122'
//   }

// ]


let countInform = 0

app.get('/', (request, response) => {
  response.json('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response, next) => {
  countInform += 1
  Person.find({}).then(person => {
    response.json(person)
    // mongoose.connection.close()
  })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {

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

  Person.findById(id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(err => next(err))

})

app.get('/info', (request, response) => {

  const date = new Date()
  response.send(`<div>Phonebook has info for ${countInform} people<div>
        <div>${date}</div>`)
})

app.delete('/api/persons/:id', (request, response, next) => {
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
      next(err)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  // const id = request.params.id

  Person.findOne({ name: name })
    .then(existingPerson => {
      if(existingPerson){
        console.log('name already exists, number will automatically update')

        existingPerson.number = number

        return existingPerson.save().then((updatedPerson) => {
          response.json(updatedPerson)
        })
          .catch(err => next(err))

      } else {

        const person =  new Person({
          name: name,
          number: number
        })

        return person.save().then(savedPerson => {
          response.status(200).json(savedPerson)
        })
      }
    })
    .catch(err => next(err))

})


// const generateId = () => {
//     const generate = () => (Math.floor((Math.random() * 100) + 1))
//     let id = generate()
//     let findDuplicate = (currentId) => (persons.find(person => person.id === String(currentId)))


//     while (findDuplicate(id)) {
//         id = generate()
//     }

//     return String(id)

// }

app.post('/api/persons', (request, response, next) => {

  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: 'name/number missing'
    })
  }

  Person.findOne({ name: name })
    .then(existingPerson => {
      if(existingPerson){
        console.log('name already exists, number will automatically update')

        existingPerson.number = number

        return existingPerson.save().then((updatedPerson) => {
          response.json(updatedPerson)
        })
          .catch(err => next(err))

      } else {

        const person =  new Person({
          name: name,
          number: number
        })

        return person.save().then(savedPerson => {
          response.status(200).json(savedPerson)
        })
      }
    })
    .catch(err => next(err))

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError'){
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})