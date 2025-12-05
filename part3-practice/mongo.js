
const mongoose = require('mongoose')

console.log(process.argv.length)
if(process.argv.length < 3 ){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fadelahmadf_db_user:${password}@cluster0.ndxvanv.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false) // to disallowed to query that not in schema

mongoose.connect(url, {family: 4}) // to choose IPv4

const noteSchema = new mongoose.Schema({
    content : String,
    important : Boolean
}) // make new schema

const Note = mongoose.model('Note', noteSchema) // make schema as model

const note = new Note({
    content: 'HTML is easy',
    important: true
}) //make an object from Note model

// console.log(note)

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })



Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

// restricted condition when find important true

Note.find({important: true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})