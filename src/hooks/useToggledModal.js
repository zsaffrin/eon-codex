import { node, shape } from 'prop-types';
import { useState } from 'react';

import { Modal } from '../components/ui';
/**
 * Modal display with toggle
 * @param {ReactElement} nodeToRender React node to render in modal
 * @param {Object} extraProps Optional props to pass to rendered node
 * @returns {array} [modalNode, toggle]
 */
const useToggledModal = (NodeToRender, extraProps) => {
  const [valueState, setValueState] = useState(false);

  const handleToggle = (value) => {
    setValueState(value || !valueState);
  };

  const modal = valueState && (
    <Modal>
      <NodeToRender close={handleToggle} valueState={valueState} {...extraProps} />
    </Modal>
  );
  
  return [modal, handleToggle];
};
useToggledModal.propTypes = {
  NodeToRender: node,
  extraProps: shape({}),
};
useToggledModal.defaultProps = {};

export default useToggledModal;
