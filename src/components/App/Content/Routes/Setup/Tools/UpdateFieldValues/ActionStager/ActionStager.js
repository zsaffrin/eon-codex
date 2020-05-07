import React from 'react';
import { string } from 'prop-types';

import { useCollection } from '../../../../../../../../hooks';
import { Loading } from '../../../../../../../ui';
import ActionPreview from './ActionPreview';

const ActionStager = ({
  collectionId, sourceFieldId, sourceFilter, newValue,
}) => {
  const [records, recordsLoading] = useCollection(collectionId && collectionId.length > 0 ? collectionId : ' ');

  return recordsLoading && !records ? <Loading /> : (
    <ActionPreview
      collectionId={collectionId}
      recordData={[...records]}
      sourceFieldId={sourceFieldId}
      sourceFilter={sourceFilter}
      newValue={newValue}
    />
  );
};

ActionStager.propTypes = {
  collectionId: string,
  sourceFieldId: string,
  sourceFilter: string,
  newValue: string,
};
ActionStager.defaultProps = {
  collectionId: null,
  sourceFieldId: null,
  sourceFilter: null,
  newValue: null,
};

export default ActionStager;
