import React, { useState } from 'react'

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const AnecdoteLabel = ({text, value}) => {
  return (
    <div>
      {text}
      <br/>
      has {value} votes
    </div>
  )
}
const AnecdoteStatistics = ({text, value}) => {
  if (value == 0) {
    return (
      <div>
        <Header text="Annecdote with most votes" />
        No votes given
      </div>
    )
  }
  return (
    <div>
      <Header text="Annecdote with most votes"/> 
      <AnecdoteLabel text={text} value={value}/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  
  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)

  const addVote = () => {    
    const copy = [...points]
    // increment the value in position 2 by one
    copy[selected] += 1  
    
    if (copy[selected] > copy[mostVotes]){
      // update mostVotes
      setMostVotes(selected)
    }
    setPoints(copy)
  }

  return (
    <div>
      <Header text="Annecdote of the day"/>
      <AnecdoteLabel text={anecdotes[selected]} value={points[selected]}/>
      <div>
        <Button handleClick={() => addVote()} text="vote" />
        <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      </div>  
      <AnecdoteStatistics text={anecdotes[mostVotes]} value={points[mostVotes]}/>
    </div>
  )
}

export default App