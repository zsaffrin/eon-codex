import styled from 'styled-components';

import { randomKey } from '../../../utilities';

const BreadcrumbTrail = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    font-size: 0.8rem;
    grid-auto-flow: column;
    grid-auto-columns: min-content;
    grid-gap: ${space.md};
    justify-items: start;
    white-space: nowrap;

    & > *:after {
      content: '/';
      padding-left: ${space.md};
    }
    & > *:last-of-type:after {
      content: '';
      padding: 0;
    }
  `;
});

const Breadcrumb = ({ items }) => (
  <BreadcrumbTrail>
    {items.map((item) => <div key={randomKey(5)}>{item}</div>)}
  </BreadcrumbTrail>
);

export default Breadcrumb;
