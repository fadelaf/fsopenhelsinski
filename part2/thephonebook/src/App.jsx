import { useEffect, useState } from 'react'
import Person from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
// import axios from 'axios'
import Phone from './service/phone'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')
  const [notif, setNotif] = useState('')

  const hook = () => {
    
    Phone
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      }) 
      
  }
  useEffect(hook, [])






  // hook()


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif}/>
      <Filter value={filterName} setFilter={setFilter}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} 
                  setNewNumber={setNewNumber} length={persons.length}
                  setPersons={setPersons}
                  persons={persons} setNotif={setNotif}
                  />
      <h2>Numbers</h2>
      <div>
        {
          filterName === '' ?
          persons.map(person => <Person key={person.id} name={person.name} number={person.number} id={person.id} setPersons={setPersons}
                  persons={persons} setNotif={setNotif}/>) :
          persons.map(person => 
          {
              if (person.name.toLowerCase().includes(filterName.toLowerCase())){
                return <Person key={person.id} name={person.name} number={person.number} id={person.id} setPersons={setPersons}
                  persons={persons} setNotif={setNotif} />
              }
            }
          )
        } 


      </div>

   
    </div>
    )
}


export default App