import styled from 'styled-components';
import { FaSkullCrossbones } from 'react-icons/fa';

import { Link, Page } from '../../../../ui';

const StyledContent = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: ${space.xl};
    justify-content: center;
    `;
});
const RightColumn = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.lg};
    `;
});
const LeftColumn = styled.div`
  font-size: 5rem;
  padding-top: 1rem;
`;
const Bolded = styled.div`
  font-size: 5rem;
  font-weight: bold;
`;

const FourOhFour = () => (
  <Page>
    <StyledContent>
      <LeftColumn>
        <FaSkullCrossbones />
      </LeftColumn>
      <RightColumn>
        <Bolded>404</Bolded>
        <div>
          <div>
            Critical perception fail. Page not found.
          </div>
          <div>
            <Link to="/">Home</Link>
          </div>
        </div>
      </RightColumn>
    </StyledContent>
  </Page>
);

export default FourOhFour;
