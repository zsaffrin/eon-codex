import { Button, ButtonRow } from '../../../../../../ui';

const AddCharacterImage = ({ close }) => {
  const handleCancel = () => {
    close();
  };

  return (
    <div>
      <ButtonRow>
        <Button label="Cancel" onClick={handleCancel} />
      </ButtonRow>
    </div>
  );
};
AddCharacterImage.propTypes = {};
AddCharacterImage.defaultProps = {};

export default AddCharacterImage;
