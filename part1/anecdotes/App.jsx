import { useState } from 'react'


const Button = ({text, onClick}) => {
   return ( <>
    <button onClick={onClick}>{text}</button>
    </>
   )
}

const MostVote = ({anecdote, highest}) => {


    if (highest === 0 ){

        return null

    } else {
    
        return (
            <>
                <p>{anecdote}</p>
                <p>has {highest} votes</p>
            </>
        )

    }
    

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const votes = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}
  const [vote , setVote] = useState(votes)
  let highest = 0
  let highest_key = 0


  const voting = () => {
    
    const votes_copy = {...vote}
    // console.log('votes_copy before',vote)
    votes_copy[selected] += 1
    setVote(votes_copy)

  }

  const slideAnecdote = () => {
    if (selected === anecdotes.length-1){
        setSelected(0)
    } else {
        setSelected(selected + 1)
    }

  }

    for (let i = 0; i < Object.keys(vote).length; i++){
       
        if( highest < vote[i]){
            highest = vote[i]
            highest_key = Object.keys(vote)[i]
        
        }
    }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button text="vote" onClick={voting}/>
      <Button text="next anecdote" onClick={slideAnecdote}/>
      <h1>Anecdote with most votes</h1>
      <MostVote highest={highest} anecdote={anecdotes[highest_key]} />
    </div>
  )
}

export default App