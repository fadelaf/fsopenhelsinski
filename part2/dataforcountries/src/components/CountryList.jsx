const CountryList = (props) => {


    const handleChange = (event) => {
        event.preventDefault()
        props.setSearch(event.target.value)

    }

    console.log(props.country)

    return (
        <li key={props.country}> {props.country} <button onClick={handleChange} value={props.country}>show</button>
        </li>
    )

}

export default CountryList