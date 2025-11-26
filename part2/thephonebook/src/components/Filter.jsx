

const Filter = (props) => {
    
    const handleFilter = (event) => {
    console.log(event.target.value)
    props.setFilter(event.target.value)
  }
    
    console.log(props)
    return <div>filter shown with<input value={props.value} onChange={handleFilter}/></div>
}


export default Filter