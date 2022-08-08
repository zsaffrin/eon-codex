import { bool, shape, string } from "prop-types";

import { VerticalList } from '../../../../../../ui';

const SchemaDetails = ({ schema }) => {
  const items = [
    {
      label: 'Id',
      content: schema.id,
    },
    {
      label: 'Name',
      content: schema.name,
    },
    {
      label: 'Per Campaign?',
      content: schema.isPerCampaign && schema.isPerCampaign.toString(),
    },
  ];

  return (
    <VerticalList items={items} />
  );
};
SchemaDetails.propTypes = {
  schema: shape({
    id: string,
    name: string,
    isPerCampaign: bool,
  }),
};
SchemaDetails.defaultProps = {
  schema: {},
};

export default SchemaDetails;
