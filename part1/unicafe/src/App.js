import React, { Fragment, useState } from 'react'

const Title = props => {
  const { text } = props;

  return <h1>{text}</h1>
}

const Button = props => {
  const { text, handleClick } = props;

  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = props => {
  const { statistics } = props;

  if (!statistics) {
    return <p>No feedback given</p>
  } else {
    const { good, neutral, bad, all, average, positive } = statistics;

    return (
      <Fragment>
        <table>
          <tbody>
            <StatisticLine name="good" count={good} />
            <StatisticLine name="neutral" count={neutral} />
            <StatisticLine name="bad" count={bad} />
            <StatisticLine name="all" count={all} />
            <StatisticLine name="average" count={average} />
            <StatisticLine name="positive" count={positive} />
          </tbody>
        </table>
      </Fragment>
    )
  }
}

const StatisticLine = props => {
  const { name, count } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>{count}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const fbTitle = 'give feedback';
  const sTitle = 'statistics';

  const all = good + neutral + bad;
  const average = (good * 1 + bad * (-1)) / all;
  const positive = `${good / all * 100} %`;

  let statistics = null;

  const addGood = () => {
    setGood(good + 1);
  }

  const addNeutral = () => {
    setNeutral(neutral + 1);
  }

  const addBad = () => {
    setBad(bad + 1);
  }

  if (all) {
    statistics = {
      good,
      neutral,
      bad,
      all,
      average,
      positive,
    };
  }

  return (
    <Fragment>
      <Title text={fbTitle} />
      <div>
        <Button text="good" handleClick={addGood} />
        <Button text="neutral" handleClick={addNeutral} />
        <Button text="bad" handleClick={addBad} />
      </div>

      <Title text={sTitle} />
      <Statistics statistics={statistics} />
    </Fragment>
  )
}

export default App