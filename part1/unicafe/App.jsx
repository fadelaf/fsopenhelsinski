

import { useState } from "react";


const Button = (props) => {
    return (
    <button onClick={props.onClick} >{props.text}</button>
    )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
    console.log(all)

    if (all === 0 ){
        return (
        <>
        <p>no given feedback</p>
        </>
      )
    }
    else {

        return(
            <>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {positive}%</p>
            </>
        )

    }
} 


const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const average = (good + 0 - bad) / all
    const positive = (good / all) * 100
    const statInfo = {
        all,
        average,
        positive,
        bad,
        good,
        neutral
    }

    console.log(statInfo)

    const handler = (feedback) => {
        console.log(feedback)
        if (feedback == 'good') {
            setGood(good + 1)
        }

        if (feedback == 'neutral'){
            setNeutral(neutral + 1)
        }

        if (feedback == 'bad'){
            setBad(bad + 1)
        }
    }



    return(
        <div>
            <h1>give feedback</h1>
            <Button text="good" onClick={() => handler('good')}/>
            <Button text="neutral" onClick={() => handler('neutral')}/>
            <Button text="bad" onClick={() => handler('bad')}/>
            <h1>Statistics</h1>
            <Statistics {...statInfo} />
        </div>
    )

}

export default App