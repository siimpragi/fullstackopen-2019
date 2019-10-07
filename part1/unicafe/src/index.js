import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) =>
  <button onClick={onClick}>
    {text}
  </button>

const Statistic = ({ name, value }) =>
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all || 0
  const positive = (good / all) * 100 || 0

  if (!(good | neutral | bad)) return <p>No feedback given</p>
  
  return (
    <table>
      <tbody>
        <Statistic name={"good"} value={good} />
        <Statistic name={"neutral"} value={neutral} />
        <Statistic name={"bad"} value={bad} />
        <Statistic name={"all"} value={all} />
        <Statistic name={"average"} value={average} />
        <Statistic name={"positive"} value={`${positive} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} onClick={() => setGood(good + 1)} />
      <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)} />
      <Button text={'bad'} onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)