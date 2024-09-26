import { useState } from "react";

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>;

const Anecdote = ({ text, votes }) => {
  return (
    <p>
      {text} <br />
      has {votes} votes
    </p>
  );
};

const MostVoted = ({ anecdotes, points }) => {
  const totalVotes = points.reduce((a, b) => a + b);

  if (totalVotes === 0) {
    return <h1> </h1>;
  } else {
    const maxVotes = Math.max(...points);
    const maxVotedIndex = points.indexOf(maxVotes);

    return (
      <div>
        <h1> Anecdote with most votes </h1>
        <Anecdote text={anecdotes[maxVotedIndex]} votes={maxVotes} />
      </div>
    );
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const handleSelect = () => {
    setSelected(getRandomIntInclusive(0, anecdotes.length));
  };

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button handler={handleVote} text="vote" />
      <Button handler={handleSelect} text="next anecdote" />
      <MostVoted points={points} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
