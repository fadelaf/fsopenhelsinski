
import { useState } from 'react'
import { ssrExportAllKey } from 'vite/module-runner'

const Display = ({counter}) => {
    return (
        <div>{counter}</div>
    )
}

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press History: {props.allClicks.join(' ')}
        </div>
    )
}

// const Button = ({ onClick, Text}) => <button onClick={onClick}>{Text}</button>

const Button = (props) => {
    // console.log(props)
    return (
        <button onClick={props.onClick}>
            {props.Text}
        </button>
    )
}


const App = () => {

    // const [counter, setCounter]  = useState(0)

    // console.log('rendering with counter value', counter)
    
    // const increaseByOne = () => {
    //     console.log("increasing, value before", counter)
    //     setCounter(counter + 1)
    // }
    // const decreaseByOne = () => {
    //     console.log('decreasing, value before', counter)
    //     setCounter(counter - 1)
    // }

    // const setToZero = () => {
    //     console.log('resetting to zero, value before',counter)
    //     setCounter(0)
    // }
    // return ( 
    //     <div>
    //         <Display counter={counter}/>
    //         <Button 
    //             onClick = {increaseByOne}
    //             text = 'plus' />
    //         <Button
    //             onClick = {setToZero}
    //             text = 'zero'
    //             />
    //         <Button
    //             onClick= {decreaseByOne}
    //             text= 'minus' />
    //     </div>

    // )

    // // // //

    // const [clicks , setClicks] = useState({
    //     left: 0, right: 0
    // })

    // const [left, setLeft] = useState(0)
    // const [right, setRight] = useState(0)
    // const [allClicks, setAll] = useState([])
    // const [total, setTotal] = useState(0)

    // const handleLeftClick = () => {
    //     setAll(allClicks.concat('L'))
    //     const updatedLeft = left + 1
    //     setLeft(updatedLeft)
    //     setTotal(updatedLeft + right)
    // }

    // const handleRightClick = () => {
    //     setAll(allClicks.concat('R'))
    //     const updatedRight = right + 1  
    //     setRight(updatedRight)
    //     setTotal(updatedRight + left)
    // }

    // return (
    //     <div>
    //         {left}
    //         <Button onClick={handleLeftClick} Text='left' />
    //         <Button onClick={handleRightClick} Text='right' />
    //         {right}
    //         <History allClicks={allClicks}/>
    //     </div>

    // )

    const [value, setValue] = useState(10)

    const hello = (who) => () => {
        console.log('hello', who)
    }

    const setToValue = (new_value) => {
        setValue(new_value)
        console.log("value now", new_value)

    }

   

    // const handleClick = () => {
    //     console.log('click the button')
    //     setValue(0)
    // }
    return (
        <div>
            {value}
            <Button onClick={() => {setToValue(1000)}} Text="thousand" />
            <Button onClick={() => setToValue(0)} Text="zero"/>
            <Button onClick={() => setToValue(value + 1)} Text="increased" />
        </div>
    )


}

export default App
