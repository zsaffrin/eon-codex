import styled from 'styled-components';
import { BiCheckbox } from 'react-icons/bi';

import { useCampaign } from '../../../../../../../../../hooks';

const Layout = styled.div(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-gap: ${layout.padding};
  `;
});

const Section = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.sm};
  `;
});

const KeyValuePair = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.sm};
    grid-template-columns: 3.5em 1fr;
    align-items: center;
  `;
});

const Centered = styled.div`
  text-align: center;
`;
const Bold = styled.div`
  font-weight: bold;
`;

const CampaignSettings = () => {
  const { name, key } = useCampaign();
  
  return (
    <Layout>
      <Section>
        <KeyValuePair>
          <div>Name</div>
          <Bold>{name}</Bold>
        </KeyValuePair>
        <KeyValuePair>
          <div>Key</div>
          <div>{key}</div>
        </KeyValuePair>
      </Section>
      <Section>
        <KeyValuePair>
          <Centered>
            <BiCheckbox />
          </Centered>
          <div>Enable Groups</div>
        </KeyValuePair>
        <KeyValuePair>
          <Centered>
            <BiCheckbox />
          </Centered>
          <div>Enable People</div>
        </KeyValuePair>
        <KeyValuePair>
          <Centered>
            <BiCheckbox />
          </Centered>
          <div>Enable Places</div>
        </KeyValuePair>
        <KeyValuePair>
          <Centered>
            <BiCheckbox />
          </Centered>
          <div>Enable Playlists</div>
        </KeyValuePair>
      </Section>
    </Layout>
  );
};

export default CampaignSettings;
