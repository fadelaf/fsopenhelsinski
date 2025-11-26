import Weather from "./Weather"

const Country = ({country, weather}) => {

    if (!country){
        return null
    }

    const langList = []
    const {languages} = country
    

    for (const key in languages){
        langList.push(languages[key])
    } 

    langList.forEach((data,idx) => console.log(data,idx))


    return (
        <div>
            <h1>{country.name}</h1>
            <>Capital {country.capital}</>
            <br />
            <>Area {country.area}</>

            <h2>Languages</h2>
            <div>
                <ul>
                    {
                      langList.map((language,idx) => {
                        return <li key={idx}>{language}</li>
                      })
                    }
                </ul>
            </div>
                <br />    
            <div>
                <img src={country.flags} alt="" />
            </div>
            <Weather weather={weather}/>

            
        </div>
    )


}


export default Country