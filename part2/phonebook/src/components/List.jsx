const List = ({ array, handleDelete }) => {
  return (
    <div>
      {array.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={handleDelete(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default List;
