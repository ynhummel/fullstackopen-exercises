const Form = ({ onSubmit, obj, setObj }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <FormInput
          text="name"
          obj={obj.name}
          onChange={(e) =>
            setObj({
              name: e.target.value,
              number: obj.number,
            })
          }
        />
        <FormInput
          text="number"
          obj={obj.number}
          onChange={(e) =>
            setObj({
              name: obj.name,
              number: e.target.value,
            })
          }
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const FormInput = ({ text, obj, onChange }) => {
  return (
    <div>
      {text}: <input value={obj} onChange={onChange} />
    </div>
  );
};

export default Form;
