import CountryView from "./CountryView";

const List = ({ array, handleShow }) => {
  if (array.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (array.length === 1) return <CountryView country={array[0]} />;

  return (
    <div>
      {array.map((country) => (
        <div key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleShow(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default List;
