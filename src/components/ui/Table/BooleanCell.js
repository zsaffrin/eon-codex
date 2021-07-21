import { BiCheck } from 'react-icons/bi';
import styled from 'styled-components';

const StyledCell = styled.div`
  text-align: center;
`;

const BooleanCell = ({ fieldValue }) => {
  return (
    <StyledCell>
      {fieldValue && <BiCheck style={{ verticalAlign: 'middle' }} />}
    </StyledCell>
  );
};

export default BooleanCell;
