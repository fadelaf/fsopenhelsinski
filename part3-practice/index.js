require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')
// const cors = require('cors')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)



let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


app.get('/', (request, response) => {
    response.json('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    // response.json(notes)
    Note.find({}).then(notes => {
      response.json(notes)
    })
    .catch(error => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
    
  Note.findById(request.params.id).then(note => {
    if(note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))

})

app.delete('/api/notes/:id', (request, response, next) => {
    const id = request.params.id

    // notes = notes.filter(note => note.id !== id)
    // response.status(204).end()

    Note.findByIdAndDelete(id) 
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))



})

app.put('/api/notes/:id', (request, response) => {
    const {content, important } = request.body
    const id = request.params.id 
    // console.log(content, important, id) 
   
    // const noteIndex = notes.findIndex(note => note.id === id)
    // // console.log(noteIndex)

    // if (noteIndex === -1) {
    //     console.log('note not found')
    //     return response.status(404).json({ error: 'note not found' })
    // }

    // notes[noteIndex] = {
    //   ...notes[noteIndex],
    //   content: content,
    //   important: !notes[noteIndex].important
    // }

    // // console.log(notes[noteIndex])
    // response.json(notes[noteIndex])


    Note.findById(id)
      .then(note => {
        if(!note){
          return response.status(204).end()
        }

        note.content = content 
        note.important =important

        return note.save().then((updatedNote) => {
          response.json(updatedNote)
        })  
      })
      .catch(error => next(error))
})


const generateId = () => {
  const maxId = notes.length > 0 ?
  Math.max(...notes.map(n => Number(n.id))) : 0
 return String(maxId + 1) 
}

app.post('/api/notes', (request, response) => {

    const body = request.body

    if (!body.content) {
      return response.status(400).json({
        error: 'content missing'
      })
    }

    const note = new Note({
      content: body.content,
      important: body.important || false
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
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

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})