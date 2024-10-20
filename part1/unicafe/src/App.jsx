import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatistcLine = ({ text, votes }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{votes}</td>
    </tr>
  );
};

const Stats = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p> No feedback given </p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatistcLine text="good" votes={good} />
          <StatistcLine text="neutral" votes={neutral} />
          <StatistcLine text="bad" votes={bad} />
          <StatistcLine text="all" votes={all} />
          <StatistcLine text="average" votes={average} />
          <StatistcLine text="positive" votes={positive + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value, handleFunc) => () => handleFunc(value + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick(good, setGood)} text="good" />
      <Button handleClick={handleClick(neutral, setNeutral)} text="neutral" />
      <Button handleClick={handleClick(bad, setBad)} text="bad" />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
