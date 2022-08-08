const BooleanInput = ({ id, value, onChange }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={value}
      onChange={() => onChange({
        id,
        value: !value,
      })}
    />
  );
};

export default BooleanInput;
