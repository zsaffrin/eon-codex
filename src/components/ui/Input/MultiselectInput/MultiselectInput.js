import React from 'react';
import { string } from 'prop-types';

import { useCollection, useSchema } from '../../../../hooks';
import Loading from '../../Loading';
import Multiselect from './Multiselect';

const MultiselectInput = (props) => {
  const { lookup } = props;
  const [schema, schemaLoading] = useSchema(lookup || ' ');
  const [collection, collectionLoading] = useCollection(schema && schema.collection ? schema.collection : ' ');

  const choices = collection ? collection.map(({ id, name }) => ({ id, label: name })) : [];

  return schemaLoading || collectionLoading ? <Loading /> : (
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
