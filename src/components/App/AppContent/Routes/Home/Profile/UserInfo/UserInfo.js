import { shape } from "prop-types";

import { Box, H, VerticalList } from '../../../../../../ui';

const UserInfo = ({ userdata }) => {
  const { rawData, ...rest } = userdata;

  const listItems = [
    {
      label: 'Name',
      content: rest.name,
    },
    {
      label: 'Email',
      content: rest.email,
    },
  ];

  return (
    <Box>
      <H l={2}>Info</H>
      <VerticalList items={listItems} />
    </Box>
  );
};
UserInfo.propTypes = {
  userdata: shape({}),
};
UserInfo.defaultProps = {
  userdata: {},
};

export default UserInfo;
