import React, { useState } from 'react'

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Statistic = ({text, value}) => {
  if(text === "positive"){
    return (       
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
  )
  }
  return (       
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <Header text={props.header} />
        No feedback given
      </div>
    )
  }
  return (
    <div>
    <Header text={props.header} />
    <table>
    <tbody>      
      <Statistic text="good" value ={props.good} />
      <Statistic text="neutral" value ={props.neutral} />
      <Statistic text="bad" value ={props.bad} />

      <Statistic text={"all"} value={props.good + props.neutral + props.bad}/>
      <Statistic text={"average"} value={(props.good * 1 + props.neutral * 0 + props.bad * (-1))/(props.good + props.neutral + props.bad)}/>
      <Statistic text={"positive"} value={props.good*100 / (props.good + props.neutral + props.bad)}/>
      </tbody>
    </table>   
    
   </div>
  )
}

const App = () => {
  const headers = ["give feedback", "statistics"]
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={headers[0]} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Statistics header={headers[1]} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


export default App