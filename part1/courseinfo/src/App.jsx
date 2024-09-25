const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part exercises={props.exercises[0]} />
      <Part exercises={props.exercises[1]} />
      <Part exercises={props.exercises[2]} />
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.exercises.part} {props.exercises.ex}
      </p>
    </>
  );
};

const Total = (props) => {
  const sum = props.exercises.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const exercisesArray = [
    { part: part1, ex: exercises1 },
    { part: part2, ex: exercises2 },
    { part: part3, ex: exercises3 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content exercises={exercisesArray} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
