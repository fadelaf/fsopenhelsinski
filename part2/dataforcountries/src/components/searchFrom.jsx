
const SearchForm = (props) => {

    // console.log(props)
    const handleChange = (event) => {
        props.setSearch(event.target.value)
    }


    //  const filterCountry = () => {
    //     props.
    //  }

  const filter = props.countries.filter(country => country.includes(props.searchCountry))
//   console.log(filter)



    return (
        <div>
            find country: <input value={props.searchCountry} onChange={handleChange}/>
        </div>
    )

}

export default SearchForm