import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import styled from 'styled-components';

import { Button, ButtonRow } from '../../ui';

const Spacer = styled.span`
  width: 1.5rem;
`;

const ReorderCell = ({ minOrderValue, maxOrderValue, entryOrderKey, handleReorder }) => {
  return (
    <ButtonRow compact justify="space-between">
      {minOrderValue !== entryOrderKey
        ? (
          <Button
            tiny
            onClick={() => handleReorder(entryOrderKey, (entryOrderKey - 1))}
            icon={<AiOutlineArrowUp />}
          />
        )
        : <Spacer />
      }
      {maxOrderValue !== entryOrderKey
        ? (
          <Button
            tiny
            onClick={() => handleReorder(entryOrderKey, (entryOrderKey + 1))}
            icon={<AiOutlineArrowDown />}
          />
        )
        : <Spacer />
      }
    </ButtonRow>
  );
};

export default ReorderCell;
