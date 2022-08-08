import { string } from 'prop-types';

import BooleanInput from './BooleanInput';
import DateInput from './DateInput';
import LookupInput from './LookupInput';
import LongtextInput from './LongtextInput';
import MultiselectInput from './MultiselectInput';
import NumberInput from './NumberInput';
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
  if (props.type === 'select') {
    return <SelectInput {...props} />;
  }
  if (props.type === 'multiselect') {
    return <MultiselectInput {...props} />;
  }
  
  return (
    <TextInput {...props} />
  );
};
Input.propTypes = {
  type: string,
};

export default Input;
