import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Stats = ({ text, votes }) => {
  return (
    <p>
      {text} {votes}
    </p>
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

      <h1>statistics</h1>
      <Stats text="good" votes={good} />
      <Stats text="neutral" votes={neutral} />
      <Stats text="bad" votes={bad} />
    </div>
  );
};

export default App;
