import BooleanInput from './BooleanInput';
import DateInput from './DateInput';
import LookupInput from './LookupInput';
import LongtextInput from './LongtextInput';
import NumberInput from './NumberInput';
import PasswordInput from './PasswordInput';
import SelectInput from './SelectInput';
import TextInput from './TextInput';

const Input = (props) => {
  if (props.type === 'boolean') {
    return <BooleanInput {...props} />;
  }
  if (props.type === 'date') {
    return <DateInput {...props} />;
  }
  if (props.type === 'longtext') {
    return <LongtextInput {...props} />;
  }
  if (props.type === 'lookup') {
    return <LookupInput {...props} />;
  }
  if (props.type === 'number') {
    return <NumberInput {...props} />;
  }
  if (props.type === 'password') {
    return <PasswordInput {...props} />;
  }
  if (props.type === 'select') {
    return <SelectInput {...props} />;
  }
  
  return (
    <TextInput {...props} />
  );
};

export default Input;
