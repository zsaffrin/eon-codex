import { Button, ButtonRow } from '../Button';

const ActionsCell = ({ actions, entry }) => {
  return (
    // <ButtonRow align="start" compact>
    //   {actions.map(({ label, action, authLevelRequired }) => (
    //     user && (!authLevelRequired || (user.authLevelNum >= authLevelRequired))
    //     && <Button tiny onClick={() => action(entry)} key={label}>{label}</Button>
    //   ))}
    // </ButtonRow>
    <ButtonRow justify="center" compact>
      {actions.map(({ label, action }) => (
        <Button tiny onClick={() => action(entry)} key={label}>{label}</Button>
      ))}
    </ButtonRow>
  );
};

export default ActionsCell;
