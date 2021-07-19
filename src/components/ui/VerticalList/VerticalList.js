import React, { Fragment } from 'react';
import styled from 'styled-components';

const List = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1em;
  max-width: 48em;
`;
const Label = styled.label`
  font-weight: bold;
  text-align: right;
`;
const Row = styled.div`
  grid-column: 1 / -1;
`;
const LabelCell = styled.div`
  display: grid;
  grid-auto-rows: minmax(1em, 1fr);
`;
const Detail = styled.div(({ theme }) => {
  const { text } = theme;
  return `
    font-size: 0.9em;
    color: ${text.fadedColor};
  `;
});

const VerticalList = ({ items = [] }) => {
  const rows = items.map(({ label, content, fullRow, detail }) => {
    if (fullRow) {
      return (
        <Row key={label}>{content}</Row>
      );
    }
    if (detail) {
      return (
        <Fragment key={label}>
          <LabelCell>
            <Label>{label}</Label>
            <div />
          </LabelCell>
          <div>
            <div>{content}</div>
            <Detail>{detail}</Detail>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment key={label}>
        <Label>{label}</Label>
        <div>{content}</div>
      </Fragment>
    );
  });

  return (
    <List>
      {rows}
    </List>
  );
};

export default VerticalList;
