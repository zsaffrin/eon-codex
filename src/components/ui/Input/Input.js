import React from 'react';
import { string } from 'prop-types';

import BooleanInput from './BooleanInput';
import DatetimeInput from './DatetimeInput';
import LongtextInput from './LongtextInput';
import LookupInput from './LookupInput';
import MultiselectInput from './MultiselectInput';
import NumberInput from './NumberInput';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

const Input = (props) => {
  const { type } = props;

  // Boolean
  if (type === 'kS0IrlGzDlKE9MKTHUYA') {
    return <BooleanInput {...props} />;
  }

  // Datetime
  if (type === 'o6dGESH0GHoa0ypYPrcg') {
    return <DatetimeInput {...props} />;
  }

  // Longtext
  if (type === 'EpX4vmYkb5yrNBCvrw4H') {
    return <LongtextInput {...props} />;
  }

  // Lookup
  if (type === 'ChOfADmf2wqLZEA5eDo7') {
    return <LookupInput {...props} />;
  }

  // Number
  if (type === 'y4T1eEDXxawd0fC63nRb') {
    return <NumberInput {...props} />;
  }

  // Password
  if (type === 'zVfrIGEEvr5su9KErpkY') {
    return <PasswordInput {...props} />;
  }

  // Multiselect
  if (type === 'zc4uYOZDSTNrt0Se9jKC') {
    return <MultiselectInput {...props} />;
  }

  // Password
  if (type === 'password') {
    return <PasswordInput {...props} />;
  }

  return <TextInput {...props} />;
};
Input.propTypes = {
  type: string,
};
Input.defaultProps = {
  type: null,
};

export default Input;
