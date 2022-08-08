import { arrayOf, func, node, shape, string } from 'prop-types';
import { Button } from '../Button';

const ActionsCell = ({ actions, entry }) => {
  return (
    <div>
      {actions.map(({ icon, label, action, title }) => (
        <Button
          tiny
          onClick={() => action ? action(entry) : false}
          key={title}
          icon={icon}
          label={label}
          title={title}
        />
      ))}
    </div>
  );
};
ActionsCell.propTypes = {
  actions: arrayOf(shape({
    icon: node,
    label: string,
    action: func,
    title: string,
  })),
  entry: shape({}),
};
ActionsCell.defaultProps = {
  actions: [],
  entry: {},
};

export default ActionsCell;
