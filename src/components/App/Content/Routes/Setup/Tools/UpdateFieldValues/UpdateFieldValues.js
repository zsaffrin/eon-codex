import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Breadcrumb, H, Input, Link, Page, VerticalList,
} from '../../../../../../ui';
import ActionStager from './ActionStager';

const PageLayout = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.lg};
    align-content: start;
  `;
});

const UpdateFieldValues = () => {
  const [parameters, setParameters] = useState({
    collectionId: '',
    sourceFieldId: '',
    sourceFilter: '',
    newValue: '',
  });

  const handleParameterChange = ({ id, value }) => {
    setParameters({ ...parameters, [id]: value });
  };

  return (
    <Page>
      <Breadcrumb items={[
        <Link to="/setup">Setup</Link>,
        <Link to="/setup/tools">Tools</Link>,
      ]}
      />
      <H l={1}>Update Field Values</H>
      <PageLayout>
        <div>
          <p>
            This tool updates the contents of a field to a given value
            on all records in a collection.
          </p>
        </div>
        <div>
          <VerticalList items={[
            {
              label: 'Collection',
              content: (
                <Input
                  type="text"
                  id="collectionId"
                  value={parameters.collectionId}
                  onChange={handleParameterChange}
                />
              ),
            },
            {
              label: 'Source Field',
              content: (
                <Input
                  type="text"
                  id="sourceFieldId"
                  value={parameters.sourceFieldId}
                  onChange={handleParameterChange}
                />
              ),
            },
            {
              label: 'Source Filter',
              content: (
                <Input
                  type="text"
                  id="sourceFilter"
                  value={parameters.sourceFilter}
                  onChange={handleParameterChange}
                />
              ),
            },
            {
              label: 'New Value',
              content: (
                <Input
                  type="text"
                  id="newValue"
                  value={parameters.newValue}
                  onChange={handleParameterChange}
                />
              ),
            },
          ]}
          />
        </div>
        <div>
          <H l={2}>Result Preview</H>
          <ActionStager
            collectionId={parameters.collectionId}
            sourceFieldId={parameters.sourceFieldId}
            sourceFilter={parameters.sourceFilter}
            newValue={parameters.newValue}
          />
        </div>
      </PageLayout>
    </Page>
  );
};

export default UpdateFieldValues;
