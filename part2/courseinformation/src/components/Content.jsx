
import Part from "./Part"

const Content = ({parts}) => {
    console.log('Content file props: ', parts)
    
    let sum = parts.reduce((total, count) => total + count.exercises,0)

    return (
        <div>
            {parts.map(part => {
                console.log(part)
                return <Part parts={part} key={part.id}/>
            })}
            <p><b>total of {sum} exercises</b></p>
        </div>
    )

}
   


export default Content