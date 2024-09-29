const List = ({ array }) => {
  return (
    <div>
      {array.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default List;
