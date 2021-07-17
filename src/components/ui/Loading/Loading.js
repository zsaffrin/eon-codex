import styled from 'styled-components';

const LoadingDiv = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const FullHeightDiv = styled(LoadingDiv)`
  height: 100vh;
`;

const Loading = ({ fullpage, inline }) => {
  if (inline) {
    return <span>Loading...</span>;
  }

  if (fullpage) {
    return <FullHeightDiv>Loading...</FullHeightDiv>;
  }
  
  return <LoadingDiv>Loading...</LoadingDiv>;
};

export default Loading;
