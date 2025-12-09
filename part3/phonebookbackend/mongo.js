// const mongoose = require('mongoose')

// if (process.argv.length<3){
//     console.log('give password as argument')
//     process.exit(1)
// }

// const url = process.env.MONGODB_URI

// mongoose.set('strictQuery', false)

// mongoose.connect(url, {family: 4})

// const phoneSchema = new mongoose.Schema({
//     name: String,
//     number: String
// })

// const Phone = mongoose.model('Phone', phoneSchema)

// console.log('sampe sini jalan')
// if (process.argv.length === 3){

//     Phone.find({}).then(persons => {

//         console.log('phonebook:') 
//         persons.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//         })

//         mongoose.connection.close()
//     })

// }

// const phone = new Phone({
//     name: process.argv[3],
//     number: process.argv[4]
// })

// phone.save().then(result => {   
//     console.log(`added ${result.name} number ${result.number} to phonebook`)
//     mongoose.connection.close()
// }
// )