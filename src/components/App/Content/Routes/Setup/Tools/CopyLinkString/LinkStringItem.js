import React from 'react';
import { shape, string } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { Button, Icon } from '../../../../../../ui';

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkStringItem = ({ categoryKey, item }) => {
  const { id, name } = item;

  return (
    <StyledRow>
      {name}
      <CopyToClipboard text={`[${name}](${categoryKey === 'sessions' ? `/sessions/${id}` : `/info/${categoryKey}/${id}`})`}>
        <Button tiny>
          <Icon name="copy" />
        </Button>
      </CopyToClipboard>
    </StyledRow>
  );
};

LinkStringItem.propTypes = {
  item: shape({}),
  categoryKey: string,
};
LinkStringItem.defaultProps = {
  item: {},
  categoryKey: '',
};

export default LinkStringItem;
