import { arrayOf, node, oneOfType, shape, string } from "prop-types";
import styled from 'styled-components';

import { Breadcrumb, H } from '../../ui';

const Layout = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.sm};
  `;
});
const HeaderRow = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.lg};
    grid-template-columns: 1fr max-content;
    align-items: center;
  `;
});
const Subtitle = styled.div(({ theme }) => {
  const { text } = theme;

  return `
    font-size: 0.8rem;
    color: ${text.fadedColor};
  `;
});

const PageHeader = ({ breadcrumbs, campaignKey, pretitle, title, subtitle, content }) => {
  return (
    <Layout>
      {breadcrumbs && <Breadcrumb campaignKey={campaignKey} items={breadcrumbs} />}
      <HeaderRow>
        <div>
          {pretitle}
          <H l={1} compact>{title}</H>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </div>
        {content}
      </HeaderRow>
    </Layout>
  );
};
PageHeader.propTypes = {
  campaignKey: string,
  pretitle: oneOfType([node, string]),
  title: oneOfType([node, string]),
  subtitle: oneOfType([node, string]),
  breadcrumbs: arrayOf(shape({
    label: oneOfType([node, string]),
    target: string,
  })),
  content: node,
};
PageHeader.defaultProps = {};

export default PageHeader;
