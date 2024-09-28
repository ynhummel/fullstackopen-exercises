const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Total = ({ parts }) => (
  <p style={{ fontWeight: "bold" }}>
    Total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises
  </p>
);

export default Course;
