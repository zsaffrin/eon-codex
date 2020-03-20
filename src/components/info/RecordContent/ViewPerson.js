import React from 'react';
import { shape, string } from 'prop-types';

import { Markdown, Page } from '../../ui';

const ViewPerson = ({ record }) => {
  const { name, desc } = record;

  return (
    <Page>
      <h1>{name}</h1>
      <Markdown content={desc} />
    </Page>
  );
};
ViewPerson.propTypes = {
  record: shape({
    name: string,
    desc: string,
  }),
};
ViewPerson.defaultProps = {
  record: {
    name: '',
    desc: '',
  },
};

export default ViewPerson;
