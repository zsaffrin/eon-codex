import React from 'react';
import { string } from 'prop-types';

import { useCollection } from '../../../../hooks';
import Loading from '../../Loading';
import Multiselect from './Multiselect';

const MultiselectInput = (props) => {
  const { lookup } = props;
  const [collection, collectionLoading] = useCollection(lookup || ' ');

  const choices = collection ? collection.map(({ id, name }) => ({ id, label: name })) : [];

  return collectionLoading ? <Loading /> : (
    <Multiselect choices={choices} />
  );
};

MultiselectInput.propTypes = {
  lookup: string,
};
MultiselectInput.defaultProps = {
  lookup: ' ',
};

export default MultiselectInput;
