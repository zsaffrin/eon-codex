import { shape } from 'prop-types';
import { FaEdit } from 'react-icons/fa';

import { useToggledModal } from '../../../../../../../hooks';
import { Button, ButtonRow, Page, PageHeader, Markdown } from '../../../../../../ui';
import EditArticle from '../EditArticle';

const CategoryArticle = ({ article }) => {
  const [editModal, toggleEditModal] = useToggledModal(EditArticle);

  return (
    <Page>
      {editModal}
      <PageHeader
        title={article.name}
        content={(
          <ButtonRow>
            <Button
              small
              icon={<FaEdit />}
              label="Edit"
              onClick={() => toggleEditModal(article)}
            />
          </ButtonRow>
        )}
      />
      <Markdown content={article.content} />
    </Page>
  );
};
CategoryArticle.propTypes = {
  article: shape({}),
};
CategoryArticle.defaultProps = {
  article: {},
};

export default CategoryArticle;
