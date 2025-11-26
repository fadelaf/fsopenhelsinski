import Phone from "../service/phone"
const Person = (props) => {

    console.log(props)


    const deleteContact = (event) => {

        event.preventDefault()
        console.log(event.target.value)
        const id = event.target.value
        const confirmation = confirm(`Delete ${props.name}?`)

        if (confirmation) {
            Phone.remove(id)
                .then(response => {
                    props.setPersons(props.persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    console.log(error)
                    props.setNotif(`Information of ${props.name} has already been removed from server`)
                    props.setPersons(props.persons.filter(person => person.id !== id))
                    setTimeout(() => {
                        props.setNotif(null)
                    },5000)

                })
            
        }


    }
    
    return (
        <div>
            {props.name} {props.number} <button onClick={deleteContact} value={props.id} >delete</button>
        </div>
    )
}

export default Person