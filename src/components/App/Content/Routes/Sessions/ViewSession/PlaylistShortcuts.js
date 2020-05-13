import React from 'react';
import styled from 'styled-components';

import { useCollection } from '../../../../../../hooks';
import { Link, Loading } from '../../../../../ui';

const StyledSection = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: ${space.md};
  `;
});
const StyledLink = styled(Link)(({ theme }) => {
  const { color, space } = theme;
  return `
    border: 1px solid ${color.lightgray};
    border-radius: 4px;
    color: inherit;
    font-size: 0.8em;
    padding: ${space.md};
    text-align: center;

    &:hover {
      border-color: ${color.highlight};
      color: ${color.highlight};
      text-decoration: none;
    }
  `;
});


const PlaylistShortcuts = () => {
  const [playlists, playlistsLoading] = useCollection('playlists');

  return playlistsLoading ? <Loading /> : (
    <StyledSection>
      {playlists.map(({ id, name, url }) => (
        <StyledLink key={id} to={url} external>
          {name}
        </StyledLink>
      ))}
    </StyledSection>
  );
};

export default PlaylistShortcuts;
