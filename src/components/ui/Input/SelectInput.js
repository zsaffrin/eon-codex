
const SelectInput = ({
  id, value, onChange, choices,
}) => {
  
  const handleChange = (e) => {
    const newValue = e.target.value === '' ? null : e.target.value;

    onChange({ id, value: newValue });
  };

  return (
    <select id={id} value={value || ''} onChange={handleChange}>
      <option value="" />
      {choices.map(({ itemValue, label }) => (
        <option value={itemValue} key={itemValue}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
