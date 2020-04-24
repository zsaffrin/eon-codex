import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';

const LoadingDiv = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Loading = ({ inline }) => (
  inline
    ? <span>Loading...</span>
    : <LoadingDiv>Loading...</LoadingDiv>
);
Loading.propTypes = {
  inline: bool,
};
Loading.defaultProps = {
  inline: false,
};

export default Loading;
