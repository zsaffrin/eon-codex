import React from 'react';
import { shape, string } from 'prop-types';

import { Markdown, Notes, Page } from '../../ui';

const ViewGroup = ({ record }) => {
  const { name, shortDesc, desc } = record;

  return (
    <Page>
      <h1>{name}</h1>
      <div>{shortDesc}</div>
      <Markdown content={desc} />
      <Notes />
    </Page>
  );
};
ViewGroup.propTypes = {
  record: shape({
    name: string,
    shortDesc: string,
    desc: string,
  }),
};
ViewGroup.defaultProps = {
  record: {
    name: '',
    shortDesc: '',
    desc: '',
  },
};

export default ViewGroup;
