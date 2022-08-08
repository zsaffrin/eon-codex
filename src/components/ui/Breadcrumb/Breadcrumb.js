import { arrayOf, node, oneOfType, shape, string } from 'prop-types';
import { FaHome } from 'react-icons/fa';
import styled from 'styled-components';

import { randomCharString } from '../../../utilities';
import { Link } from '..';

const BreadcrumbTrail = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    font-size: 0.8rem;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    grid-gap: ${space.md};
    justify-items: start;
    white-space: nowrap;

    & > * {
      display: grid;
      align-items: center;
    }
  `;
});

const Breadcrumb = ({ campaignKey, items }) => {
  const itemLinks = items.reduce((acc, { label, target }) => {
    const itemToAdd = target
      ? <Link key={randomCharString(5)} to={target}>{label}</Link>
      : <div key={randomCharString(5)}>{label}</div>;

    return [ ...acc, itemToAdd ];
  }, [
    (
      <Link key={randomCharString(5)} to={campaignKey ? `/campaign/${campaignKey}` : '/'}>
        <FaHome />
      </Link>
    ),
  ]);

  const separatedItemLinks = itemLinks.reduce((acc, i) => {
    const updatedArray = [
      ...acc,
      i,
      <div key={randomCharString(5)}>{'/'}</div>,
    ];
    
    return updatedArray;
  }, []);

  return (
    <BreadcrumbTrail>
      {separatedItemLinks}
    </BreadcrumbTrail>
  );
};
Breadcrumb.propTypes = {
  campaignKey: string,
  items: arrayOf(shape({
    label: oneOfType([node, string]),
    target: string,
  })),
};
Breadcrumb.defaultProps = {
  items: [],
};

export default Breadcrumb;
