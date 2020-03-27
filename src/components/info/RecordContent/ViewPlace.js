import React from 'react';
import { shape, string } from 'prop-types';

import { Markdown, Notes, Page } from '../../ui';

const ViewPlace = ({ record }) => {
  const { name, shortDesc, longDesc } = record;

  return (
    <Page>
      <h1>{name}</h1>
      <p>{shortDesc}</p>
      <Markdown content={longDesc} />
      <Notes />
    </Page>
  );
};
ViewPlace.propTypes = {
  record: shape({
    name: string,
    shortDesc: string,
    longDesc: string,
  }),
};
ViewPlace.defaultProps = {
  record: {
    name: '',
    shortDesc: '',
    longDesc: '',
  },
};

export default ViewPlace;
