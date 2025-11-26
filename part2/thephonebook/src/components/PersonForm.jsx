import Phone from '../service/phone'

const PersonForm = (props) => {

    console.log(props)

  const handlePhonebookChange = (event) => {
    console.log(event.target.value)
    props.setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    props.setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const id = String(props.length+1)
    const newPerson = {
      name: props.newName,
      number: props.newNumber,
      id: id
    }

    if (props.persons.some(person => person.name === props.newName)){
        const confirmation = confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)
        const findPerson = props.persons.find(person => person.name === props.newName)
        const person = {...findPerson, number:props.newNumber}
        console.log(findPerson)
        // console.log(person)

        if (confirmation) {
          Phone.update(person.id, person)
            .then(response => {
                console.log(response)
                props.setPersons(props.persons.map(person => person.id === response.id ? response : person))
                props.setNewName('')
                props.setNewNumber('')
                props.setNotif(`updated ${person.name}`)
                setTimeout(() => {
                  props.setNotif(null)
                },5000)
         })

        //  const 


        }


    } else {

        Phone.add(newPerson)
          .then(person => {
              console.log(person)
              props.setPersons(props.persons.concat(person))
              props.setNewName('')
              props.setNewNumber('')
              props.setNotif(`added ${newPerson.name}`)
              setTimeout(() => {
                props.setNotif(null)
              },5000)
          })


    }
  }

  
    return (

      <form action="" onSubmit={addPerson}>
        <div> name : <input value={props.newName} onChange={handlePhonebookChange} /> </div>
        <div> number: <input value={props.newNumber} onChange={handleNumberChange}/> </div>
        <div>
          <button type="submit"> add </button>
        </div>
      </form>

    )
}

export default PersonForm