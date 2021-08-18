import { useParams } from 'react-router-dom';

import { H, Page } from '../../../../../../ui';

const Info = () => {
  const { categoryId } = useParams();
  
  return (
    <Page>
      <H l={1}>Info</H>
      {categoryId}
    </Page>
  );
};

export default Info;
